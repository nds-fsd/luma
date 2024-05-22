const City = require('../models/cityModel');



exports.getCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.status(200).send(cities);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).send();
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createCity = async (req, res) => {
    try {
        const city = new City(req.body);
        await city.save();
        res.status(201).send(city);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateCity = async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!city) {
            return res.status(404).send();
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.patchCity = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'country', 'population', 'area', 'established', 'landmarks', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualización no permitida' });
    }

    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).send();
        }

        updates.forEach(update => city[update] = req.body[update]);
        await city.save();
        res.status(200).send(city);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).send();
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(500).send(error);
    }
};