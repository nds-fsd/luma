const express = require('express');
const cityController = require('../controllers/cityController');
const { jwtMiddleware } = require('../middlewares/index');

const cityRouter = express.Router();

cityRouter.get('/', cityController.getCities);
cityRouter.get('/:id', cityController.getCity);
cityRouter.post('/', jwtMiddleware, cityController.createCity);
cityRouter.put('/:id', jwtMiddleware, cityController.updateCity);
cityRouter.patch('/:id', jwtMiddleware, cityController.patchCity);
cityRouter.delete('/:id', jwtMiddleware, cityController.deleteCity);

module.exports = cityRouter;
