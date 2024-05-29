const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  birthdate: String,
  phone_number: String,
  role: String,
  profile_picture: String,
  password: String,
  subscribedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

module.exports = mongoose.model('User', userSchema);
