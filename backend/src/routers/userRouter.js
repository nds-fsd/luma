const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation } = require("../middlewares/index");


router.post('/register', validateUserCreation, userController.registerUser);
router.get('/', userController.getAllUsers);

module.exports = router;
