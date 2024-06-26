const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: { type: String, required: true },
  profile_picture: { type: String, required: true },
  password: { type: String, required: true },
  subscribedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  socialNetworks: [{
    network: { type: String, required: true },
    username: { type: String, required: true }
  }],
});

module.exports = mongoose.model('User', userSchema);
