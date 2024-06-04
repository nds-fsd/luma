const express = require('express');
const cors = require('cors');
const mainRouter = require('./routers/index');
const { connectDB } = require('./mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://lumatic.netlify.app'], // Reemplaza con tu dominio de Netlify
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', mainRouter);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});

module.exports = { app, server };
