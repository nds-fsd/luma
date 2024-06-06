const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation, jwtMiddleware, adminMiddleware } = require('../middlewares/index');

router.post('/register', validateUserCreation, userController.registerUser);
router.get('/subscriptions/:id', jwtMiddleware, userController.getUserSubscriptions);
router.get('/subscriptions', jwtMiddleware, userController.getUserSubscriptions);
router.get('/', jwtMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/:id', jwtMiddleware, userController.getUserById);
router.put('/:id', jwtMiddleware, userController.updateUser);
router.delete('/:id', jwtMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
