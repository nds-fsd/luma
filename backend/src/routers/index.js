const express = require('express');
const { jwtMiddleware } = require('../middlewares/index');

const eventRouter = require('./eventRouter');
const userRouter = require('./userRouter');
const cityRouter = require('./cityRouter');
const authRouter = require('./authRouter');

const MainRouter = express.Router();

MainRouter.use('/events', jwtMiddleware, eventRouter);
MainRouter.use('/user', jwtMiddleware, userRouter);
MainRouter.use('/city', jwtMiddleware, cityRouter);
MainRouter.use('/auth', authRouter);


module.exports = MainRouter;
