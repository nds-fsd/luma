const cors = require('cors');
const express = require('express');
const mainRouter = require('./routers/index');


exports.bootstrapApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/', mainRouter);

  
  return app;
}