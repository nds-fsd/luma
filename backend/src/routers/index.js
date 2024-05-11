const express = require('express');
const EventRouter = require('./eventRouter');

const MainRouter = express.Router();
MainRouter.use('/events', EventRouter);

module.exports = MainRouter;
