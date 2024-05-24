const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, birthdate, phone_number, profile_picture, password } = req.body;

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const existingUserByPhone = await User.findOne({ phone_number });
    if (existingUserByPhone) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    const role = 'CREATOR';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      birthdate,
      phone_number,
      role,
      profile_picture,
      password: hashedPassword,
    });

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

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullname, email, birthdate, phone_number, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, email, birthdate, phone_number, password },
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

exports.loginUser = async (req, res) => {
  try {
    const { email, phone_number, password } = req.body;
    console.log('Data received in the backend:', { email, phone_number, password });

   
    if (!email && !phone_number) {
      return res.status(400).json({ error: 'You must provide an email or phone number' });
    }


    const user = await User.findOne({
      $or: [{ email }, { phone_number }]
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or phone number' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password!' });
    }

    const token = jwt.sign(
      { userId: user._id, fullname: user.fullname, email: user.email, picture: user.profile_picture, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


exports.getUserData = async (req, res) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid Token' });
      } else {
        const userData = {
          fullName: decodedToken.fullname,
          email: decodedToken.email,
          id: decodedToken.userId,
          picTure: decodedToken.picture,
          role: decodedToken.role,
        };

        res.json(userData);
      }
    });
  } catch (error) {
    console.error('Error in getUserData:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
