const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation } = require('../middlewares/index');

router.post('/register', validateUserCreation, userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/token', userController.getUserData);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
