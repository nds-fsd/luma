const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const { fullname, email, birthdate, phone_number, profile_picture, password } = req.body;

  User.findOne({ email })
    .then((existingUserByEmail) => {
      if (existingUserByEmail) {
        throw { status: 400, message: 'User with this email already exists' };
      }
      return User.findOne({ phone_number });
    })
    .then((existingUserByPhone) => {
      if (existingUserByPhone) {
        throw { status: 400, message: 'User with this phone number already exists' };
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      const user = new User({
        fullname,
        email,
        birthdate,
        phone_number,
        role: 'ADMIN',
        profile_picture,
        password: hashedPassword,
      });

      return user.save();
    })
    .then(() => {
      res.status(201).json({ success: true, message: 'User registered successfully' });
    })
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ error: err.message });
      } else {
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    });
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { fullname, email, birthdate, phone_number, password } = req.body;

  User.findByIdAndUpdate(userId, { fullname, email, birthdate, phone_number, password }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.getUserSubscriptions = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .populate('subscribedEvents')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ subscribedEvents: user.subscribedEvents.map((event) => event._id) });
    })
    .catch((error) => {
      console.error('Error fetching user subscriptions:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
};
