const express = require('express');
const eventController = require('../controllers/eventController');
const { validateEventCreation, jwtMiddleware } = require('../middlewares/index');

const eventRouter = express.Router();

eventRouter.get('/most-subscribed-events', eventController.getMostSubscribedEvents);
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.post('/', eventController.createEvent);
eventRouter.put('/:id', eventController.updateEvent);
eventRouter.patch('/:id', eventController.patchEvent);
eventRouter.delete('/:id', eventController.deleteEvent);
eventRouter.post('/:eventId/subscribe', eventController.subscribeToEvent);
eventRouter.post('/:eventId/unsubscribe', eventController.unsubscribeFromEvent);

module.exports = eventRouter;
