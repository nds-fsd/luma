const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { validateUserCreation, jwtMiddleware, adminMiddleware, validatePasswordChange } = require('../middlewares/index');

// userRouter.post('/register', validateUserCreation, userController.registerUser);
userRouter.post('/register',  userController.registerUser);



userRouter.get('/subscriptions/:id', jwtMiddleware, userController.getUserSubscriptions);
userRouter.get('/subscriptions', jwtMiddleware, userController.getUserSubscriptions);
userRouter.get('/', jwtMiddleware, adminMiddleware, userController.getAllUsers);
userRouter.get('/:id', jwtMiddleware, userController.getUserById);
userRouter.put('/:id', jwtMiddleware, userController.updateUser);
userRouter.delete('/:id', jwtMiddleware, userController.deleteUser);

userRouter.post('/:id/socialNetworks', jwtMiddleware, userController.addSocialNetwork);
userRouter.get('/:id/socialNetworks', jwtMiddleware, userController.getSocialNetworks);
userRouter.put('/:id/socialNetworks', jwtMiddleware, userController.updateSocialNetworks);
userRouter.delete('/:id/socialNetworks/:network', jwtMiddleware, userController.deleteSocialNetwork);
userRouter.put('/:id/profile_picture', jwtMiddleware, userController.updateProfilePicture);
userRouter.put('/:id/password',jwtMiddleware , validatePasswordChange, userController.changePassword);

module.exports = userRouter;
