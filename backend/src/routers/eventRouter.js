const express = require('express');
const eventController = require('../controllers/eventController');
const { validateEventCreation, jwtMiddleware } = require('../middlewares/index');

const eventRouter = express.Router();

eventRouter.get('/most-subscribed-events', eventController.getMostSubscribedEvents);
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.post('/events-by-ids', jwtMiddleware, eventController.getEventsByIds);
eventRouter.post('/', jwtMiddleware, validateEventCreation, eventController.createEvent);
eventRouter.put('/:id', jwtMiddleware, eventController.updateEvent);
eventRouter.patch('/:id', jwtMiddleware, eventController.patchEvent);
eventRouter.delete('/:id', jwtMiddleware, eventController.deleteEvent);
eventRouter.post('/:eventId/subscribe', jwtMiddleware, eventController.subscribeToEvent);
eventRouter.post('/:eventId/unsubscribe', jwtMiddleware, eventController.unsubscribeFromEvent);

module.exports = eventRouter;