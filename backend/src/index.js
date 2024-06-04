const express = require('express');
const cors = require('cors');
const mainRouter = require('./routers/index');
const { connectDB } = require('./mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', mainRouter);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});

module.exports = { app, server }; 
