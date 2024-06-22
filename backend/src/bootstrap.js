const cors = require('cors');
const express = require('express');
const mainRouter = require('./routers/MainRouter');

exports.bootstrapApp = () => {
  const app = express();

  // Configurar CORS para permitir solicitudes desde Netlify y localhost
  const corsOptions = {
    origin: ['https://lumatic.netlify.app', 'http://localhost:3000'], // Agrega aquí tu dominio de Netlify y localhost para desarrollo
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/', mainRouter); // Sin prefijo '/api'

  return app;
};
