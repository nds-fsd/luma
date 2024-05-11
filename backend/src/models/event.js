const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    creationDate: {type: Date, required: true},
    eventDate: { type: Date, required: true },
    eventDescription: String,
    eventTitle: { type: String, required: true },
    eventPrice: { type: Number, required: true },
    capacity: { type: Number, required: true },        
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;



