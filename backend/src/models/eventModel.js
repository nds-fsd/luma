const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  eventLocation: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
  creationDate: { type: Date, required: true },
  eventDate: { type: Date, required: true },
  eventDescription: { type: String },
  eventTitle: { type: String, required: true },
  eventPrice: { type: Number, required: true },
  eventStartTime: { type: String, required: true },
  eventEndTime: { type: String, required: true },
  eventCapacity: { type: Number, required: true },
  eventPicture: { type: String, required: true },
  subscriptionCount: { type: Number, default: 0 },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
