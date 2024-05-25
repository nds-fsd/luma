const express = require('express');

const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const cityRouter = require('./cityRouter');

const MainRouter = express.Router();

MainRouter.use('/events', eventRouter);
MainRouter.use('/user', userRouter);
MainRouter.use('/city', cityRouter);

module.exports = MainRouter;
