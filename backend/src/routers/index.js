const express = require('express');
const EventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const MainRouter = express.Router();
MainRouter.use('/events', EventRouter);
MainRouter.use('/user', userRouter)
module.exports = MainRouter;