const express = require("express");
const cityController = require("../controllers/cityController");

const cityRouter = express.Router();

cityRouter.get('/', cityController.getCities);
cityRouter.get('/:id', cityController.getCity);
cityRouter.post('/', cityController.createCity);
cityRouter.put('/:id', cityController.updateCity);
cityRouter.patch('/:id', cityController.patchCity);
cityRouter.delete('/:id', cityController.deleteCity);

module.exports = cityRouter;