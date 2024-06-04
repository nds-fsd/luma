const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { jwtMiddleware } = require('../middlewares/index');

router.post('/register', userController.registerUser);
router.get('/subscriptions', jwtMiddleware, userController.getUserSubscriptions);
router.get('/', jwtMiddleware, userController.getAllUsers);
router.get('/:id', jwtMiddleware, userController.getUserById);
router.put('/:id', jwtMiddleware, userController.updateUser);
router.delete('/:id', jwtMiddleware, userController.deleteUser);

module.exports = router;
