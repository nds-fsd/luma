const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation, jwtMiddleware } = require('../middlewares/index');

router.post('/register', validateUserCreation, userController.registerUser);
router.get('/subscriptions', userController.getUserSubscriptions);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
