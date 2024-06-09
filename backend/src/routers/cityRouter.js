const express = require('express');
const cityController = require('../controllers/cityController');
const { jwtMiddleware, adminMiddleware } = require('../middlewares/index');

const cityRouter = express.Router();

cityRouter.get('/', cityController.getCities);
cityRouter.get('/:id', cityController.getCity);
cityRouter.post('/', jwtMiddleware, adminMiddleware, cityController.createCity);
cityRouter.put('/:id', jwtMiddleware, adminMiddleware, cityController.updateCity);
cityRouter.patch('/:id', jwtMiddleware, adminMiddleware, cityController.patchCity);
cityRouter.delete('/:id', jwtMiddleware, adminMiddleware, cityController.deleteCity);

module.exports = cityRouter;
