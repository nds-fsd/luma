const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'imageProfile',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      success: true,
      fileUrl: req.file.path,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }
});

module.exports = router;
