const express = require('express');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/user', userRouter);

module.exports = router;


/*const express = require('express');
const EventRouter = require('/eventRouter')
const userRouter = require('./userRouter');
const router = express.Router();

MainRouter.use('/events', EventRouter);
MainRouter.use('/user', userRouter);

module.exports = router;
*/