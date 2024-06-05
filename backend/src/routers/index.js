const express = require('express');

const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const cityRouter = require('./cityRouter');
const authRouter = require('./authRouter');

const MainRouter = express.Router();

MainRouter.use('/events', eventRouter);
MainRouter.use('/user', userRouter);
MainRouter.use('/city', cityRouter);
MainRouter.use('/auth', authRouter);


module.exports = MainRouter;
