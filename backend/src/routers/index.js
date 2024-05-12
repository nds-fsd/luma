const express = require('express');
const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const MainRouter = express.Router();
MainRouter.use('/events', eventRouter);
MainRouter.use('/user', userRouter)
module.exports = MainRouter;