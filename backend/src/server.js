const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routers/index');
const { connectDB } = require('./mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
