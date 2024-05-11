const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

const Event = require('../Models/event')

const getEvents = async (req, res) => {
    const queryStrings = req.query || {};
const allEvents = await Event.find(queryStrings);
res.json(allEvents)
};

const getEvent = async (req, res) => {
    const allEvents = await Event.findById(req.params.id);
    res.json(allEvents);
};

const updateEvent = async (req, res) => {
    const allEvents = await Event.findByIdAndUpdate(req.params.id,req.body, {
        new: true
      });
    console.log(allEvents);
    res.json(allEvents);
};

const patchEvent = async (req, res) => {
    const allEvents = await Event.findByIdAndUpdate(req.params.id,req.body, {
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

    console.log(body);

    const data = {
        ...body,
        owner: body.owner,
        eventDate: formatDate(body.eventDate),
        creationDate: formatDate(new Date())
    };


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

module.exports = {
    getEvents,
    getEvent,
    updateEvent,
    patchEvent,
    deleteEvent,
    createEvent
};