const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  fullname: String,
  phone_number: String,
});

module.exports = mongoose.model('User', userSchema);
