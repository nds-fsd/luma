const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    cityName: { type: String, required: true },
    cityLogo: { type: String, required: true }
});

const City = mongoose.model('City', citySchema);

module.exports = City;
