const express = require('express');
const cors = require('cors');
const router = require('./routers/index');
const { connectDB } = require('./mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

connectDB().then(() => console.log('Connected to database! ✌'));

const port = process.env.PORT_BACKEND;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
