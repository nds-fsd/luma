const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    owner: { type: Number, required: true },
    eventName: { type: Date, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    creationDate: { type: Date, required: true }
    
});

const Event = model('Event', eventSchema);

module.exports = Event;