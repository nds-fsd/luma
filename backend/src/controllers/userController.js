const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, phone_number, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const user = new User({ fullname, email, phone_number, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullname, email, phone_number, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, email, phone_number, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
