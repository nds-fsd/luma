const Subscription = require('../models/subscriptionModel');
const City = require('../models/cityModel');

const checkSubscription = async (req, res) => {
  const { email, cityName } = req.body;

  if (!email || !cityName) {
    return res.status(400).json({ message: 'Email and city are required' });
  }

  try {
    const city = await City.findOne({ cityName });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const subscription = await Subscription.findOne({ email, city: city._id });
    res.json({ isSubscribed: !!subscription });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const subscribeWithEmail = async (req, res) => {
  const { email, cityName } = req.body;

  if (!email || !cityName) {
    return res.status(400).json({ message: 'Email and city are required' });
  }

  try {
    const city = await City.findOne({ cityName });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const existingSubscription = await Subscription.findOne({ email, city: city._id });
    if (existingSubscription) {
      return res.status(400).json({ message: 'You are already subscribed for this city' });
    }

    const newSubscription = new Subscription({ email, city: city._id });
    await newSubscription.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing with email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unsubscribeWithEmail = async (req, res) => {
  const { email, cityName } = req.body;

  if (!email || !cityName) {
    return res.status(400).json({ message: 'Email and city are required' });
  }

  try {
    const city = await City.findOne({ cityName });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const subscription = await Subscription.findOneAndDelete({ email, city: city._id });
    if (!subscription) {
      return res.status(400).json({ message: 'Subscription not found' });
    }

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing with email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  checkSubscription,
  subscribeWithEmail,
  unsubscribeWithEmail
};
