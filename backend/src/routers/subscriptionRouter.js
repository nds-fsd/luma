const express = require('express');
const { checkSubscription, subscribeWithEmail, unsubscribeWithEmail } = require('../controllers/subscriptionController');

const subscriptionRouter = express.Router();

subscriptionRouter.post('/check', checkSubscription);
subscriptionRouter.post('/subscribe', subscribeWithEmail);
subscriptionRouter.post('/unsubscribe', unsubscribeWithEmail);

module.exports = subscriptionRouter;
