const formatDate = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Event = require('../models/event');

const getEvents = async (req, res) => {
        const queryStrings = req.query || {};
        const allEvents = await Event.find(queryStrings).populate('owner').populate('eventLocation').exec();
        res.json(allEvents)
};

const getEvent = async (req, res) => {
    const allEvents = await Event.findById(req.params.id).populate('owner').populate('eventLocation').exec();
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

    console.log('Backend:',data)

    try {
        const newEvent = new Event(data);
        await newEvent.save();
        res.json(newEvent);
    } catch (error) {
        console.error('Error while creating event', error);
        res.status(500).json(error);
    }
};

module.exports = {
    getEvents,
    getEvent,
    updateEvent,
    patchEvent,
    deleteEvent,
    createEvent
};