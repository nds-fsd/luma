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

    let subscription = await Subscription.findOne({ email, city: city._id });
    if (subscription) {
      if (subscription.isActive) {
        return res.status(200).json({ message: 'You are already subscribed for this city' });
      }
      subscription.isActive = true;
    } else {
      subscription = new Subscription({ email, city: city._id, isActive: true });
    }
    await subscription.save();
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

const getUserSubscriptions = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscriptions = await Subscription.find({ email }).populate('city');
    const cities = subscriptions.map(sub => ({
      cityName: sub.city.cityName,
      isSubscribed: sub.isActive
    }));
    res.json({ cities });
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const unsubscribeToNews = async (req, res) => {
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
    if (!subscription) {
      return res.status(400).json({ message: 'Subscription not found' });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({ message: 'Unsubscribed from news successfully' });
  } catch (error) {
    console.error('Error unsubscribing from news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const subscribeToNews = async (req, res) => {
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
    if (!subscription) {
      return res.status(400).json({ message: 'Subscription not found' });
    }

    subscription.isActive = true;
    await subscription.save();

    res.json({ message: 'Subscribed to news successfully' });
  } catch (error) {
    console.error('Error subscribing to news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  checkSubscription,
  subscribeWithEmail,
  unsubscribeWithEmail,
  getUserSubscriptions,
  unsubscribeToNews,
  subscribeToNews
};