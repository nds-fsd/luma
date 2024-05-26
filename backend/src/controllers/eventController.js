const Event = require('../models/eventModel');
const User = require('../models/userModel');

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getEvents = async (req, res) => {
  const queryStrings = req.query || {};
  const allEvents = await Event.find(queryStrings).populate('owner', 'fullname');
  res.json(allEvents);
};

const getEvent = async (req, res) => {
  const allEvents = await Event.findById(req.params.id).populate('owner', 'fullname');
  res.json(allEvents);
};

const updateEvent = async (req, res) => {
  const allEvents = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(allEvents);
};

const patchEvent = async (req, res) => {
  const allEvents = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    upsert: true,
  });
  res.json(allEvents);
};

const deleteEvent = async (req, res) => {
  const allEvents = await Event.findByIdAndDelete(req.params.id);
  res.json(allEvents);
};

const createEvent = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const date = new Date(formatDate(body.eventDate));
  const today = new Date();
  const data = {
    ...body,
    owner: user._id,
    eventLocation: body.eventLocation,
    eventDate: date,
    creationDate: today,
  };

  const newEvent = new Event(data);

  try {
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

const subscribeToEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.subscribedEvents.includes(eventId)) {
      return res.status(400).json({ message: 'Already subscribed to this event' });
    }

    user.subscribedEvents.push(eventId);
    await user.save();

    const event = await Event.findById(eventId);
    event.subscriptionCount += 1;
    await event.save();

    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unsubscribeFromEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const eventIndex = user.subscribedEvents.indexOf(eventId);
    if (eventIndex > -1) {
      user.subscribedEvents.splice(eventIndex, 1);
      await user.save();

      const event = await Event.findById(eventId);
      event.subscriptionCount = Math.max(0, event.subscriptionCount - 1);
      await event.save();

      res.json({ message: 'Unsubscribed successfully' });
    } else {
      res.status(400).json({ message: 'Not subscribed to this event' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getMostSubscribedEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ subscriptionCount: -1 }).exec();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribeToEvent,
  unsubscribeFromEvent,
  getEvents,
  getEvent,
  updateEvent,
  patchEvent,
  deleteEvent,
  createEvent,
  getMostSubscribedEvents,
};
