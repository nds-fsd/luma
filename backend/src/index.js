const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const mainRouter = require('./routers/index');
const { connectDB } = require('./mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 } 
}));

app.use('/', mainRouter);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is up and running ⚡ ${port}`);
});

module.exports = { app, server };
