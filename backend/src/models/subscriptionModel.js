const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  email: { type: String, required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
