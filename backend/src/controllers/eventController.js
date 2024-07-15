const Event = require('../models/eventModel');
const Subscription = require('../models/subscriptionModel');
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
  const allEvents = await Event.find(queryStrings).populate('owner').populate('eventLocation').exec();
  res.status(200).json(allEvents);
};

const getEvent = async (req, res) => {
  const allEvents = await Event.findById(req.params.id).populate('owner').populate('eventLocation').exec();
  res.json(allEvents);
};

const updateEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData._id) {
      delete updateData._id;
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    console.log(updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const patchEvent = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData._id) {
      delete updateData._id;
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      upsert: true,
    });
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteEvent = async (req, res) => {
  const allEvents = await Event.findByIdAndDelete(req.params.id);
  res.json(allEvents);
};

const createEvent = async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    return res.status(400).json({ error: 'User must be authenticated to create an event' });
  }

  const date = new Date(formatDate(body.eventDate));
  const today = new Date();
  const data = {
    ...body,
    owner: user._id,
    eventDate: date,
    creationDate: today,
  };

  // console.log('Backend:', data);

  try {
    const newEvent = await new Event(data).populate("eventLocation");
    await newEvent.save();
    const { io } = require("../index")
    io.to(newEvent.eventLocation._id.toString()).emit('msg', {
      text: `Nuevo evento en ${newEvent.eventLocation.cityName}`,
      event: newEvent,
    });

    res.status(200).json(newEvent);

  } catch (error) {
    console.error('Error while creating event', error);
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

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (user.subscribedEvents.includes(eventId)) {
      return res.status(400).json({ message: 'Already subscribed to this event' });
    }

    if (event.eventCapacity !== -1 && event.subscriptionCount >= event.eventCapacity) {
      return res.status(400).json({ message: 'Event capacity reached' });
    }

    user.subscribedEvents.push(eventId);
    await user.save();

    event.subscriptionCount += 1;
    await event.save();

    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
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

const getEventsByIds = async (req, res) => {
  const { ids } = req.body; // Se espera que los IDs se envíen en el cuerpo de la solicitud como un array

  try {
    const events = await Event.find({ _id: { $in: ids } })
      .populate('owner')
      .populate('eventLocation')
      .exec();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events by IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  getEventsByIds,
};
