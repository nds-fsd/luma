const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const subscriptionRouter = express.Router(); //test

subscriptionRouter.post('/check', subscriptionController.checkSubscription);
subscriptionRouter.post('/subscribe', subscriptionController.subscribeWithEmail);
subscriptionRouter.post('/unsubscribe', subscriptionController.unsubscribeWithEmail);

module.exports = subscriptionRouter;
