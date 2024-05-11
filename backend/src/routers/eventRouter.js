const express = require("express");
const eventController = require("../controllers/eventController");
const { validateEventCreation } = require('../middlewares/index');

const EventRouter = express.Router();

EventRouter.get('/', eventController.getEvents);
EventRouter.get('/:id', eventController.getEvent);
EventRouter.post('/',validateEventCreation, eventController.createEvent);
EventRouter.put('/:id', eventController.updateEvent);
EventRouter.patch('/:id', eventController.patchEvent);
EventRouter.delete('/:id',  eventController.deleteEvent);

module.exports = EventRouter;