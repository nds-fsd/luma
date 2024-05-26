const Event = require('../models/event');
const User = require('../models/userModel');

const formatDate = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const getEvents = async (req, res) => {
        const queryStrings = req.query || {};
        const allEvents = await Event.find(queryStrings).populate('owner', 'fullname');
        res.json(allEvents)
};

const getEvent = async (req, res) => {
    const allEvents = await Event.findById(req.params.id).populate('owner', 'fullname');
    res.json(allEvents);
};

const updateEvent = async (req, res) => {
    const allEvents = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    console.log(allEvents);
    res.json(allEvents);
};

const patchEvent = async (req, res) => {
    const allEvents = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        upsert: true
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
    console.log(body.eventDate + ' ' + formatDate(body.eventDate));
    const date = new Date(formatDate(body.eventDate));
    const today = new Date();
    const data = {
        ...body,
        owner: user._id,
        eventLocation: city._id,
        eventDate: date,
        creationDate: today
    };
    // formatDate(body.eventDate),

    console.log(data)
    // se crea una nueva instancia de evento, donde se guardaran los nuevos datos ingresados
    const newEvent = new Event(data);

    //para gurdarlo en la base de datos
    try {
        console.log('Guardando evento');
        await newEvent.save();
        res.json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

};

const subscribeToEvent = async (req, res) => {
    try {
      console.log('Request received to subscribe to event');
      const userId = req.user._id;
      const eventId = req.params.eventId;
  
      console.log(`User ID: ${userId}, Event ID: ${eventId}`);
  
      if (!eventId) {
        console.log('No event ID provided');
        return res.status(400).json({ message: 'Event ID is required' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.subscribedEvents.includes(eventId)) {
        console.log('Already subscribed to this event');
        return res.status(400).json({ message: 'Already subscribed to this event' });
      }
  
      user.subscribedEvents.push(eventId);
      await user.save();
  
      res.json({ message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Error subscribing to event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Backend: controlador para desuscribirse
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
        res.json({ message: 'Unsubscribed successfully' });
      } else {
        res.status(400).json({ message: 'Not subscribed to this event' });
      }
    } catch (error) {
      console.error('Error unsubscribing from event:', error);
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
    createEvent
};