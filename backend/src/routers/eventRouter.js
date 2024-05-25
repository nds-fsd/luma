const express = require("express");
const eventController = require("../controllers/eventController");
const { validateEventCreation, jwtMiddleware } = require('../middlewares/index');

const eventRouter = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.post('/', validateEventCreation,jwtMiddleware,  eventController.createEvent);
eventRouter.put('/:id', eventController.updateEvent);
eventRouter.patch('/:id', eventController.patchEvent);
eventRouter.delete('/:id',  eventController.deleteEvent);

module.exports = eventRouter;