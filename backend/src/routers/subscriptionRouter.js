const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const subscriptionRouter = express.Router(); 

subscriptionRouter.post('/check', subscriptionController.checkSubscription);
subscriptionRouter.post('/subscribe', subscriptionController.subscribeWithEmail);
subscriptionRouter.post('/unsubscribe', subscriptionController.unsubscribeWithEmail);
subscriptionRouter.post('/unsubscribeToNews', subscriptionController.unsubscribeToNews);
subscriptionRouter.post('/subscribeToNews', subscriptionController.subscribeToNews);
subscriptionRouter.post('/userSubscriptions', subscriptionController.getUserSubscriptions);

module.exports = subscriptionRouter;
