const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const { fullname, email, birthdate, phone_number, profile_picture, password } = req.body;

  User.findOne({ email })
    .then(existingUserByEmail => {
      if (existingUserByEmail) {
        throw { status: 400, message: 'User with this email already exists' };
      }
      return User.findOne({ phone_number });
    })
    .then(existingUserByPhone => {
      if (existingUserByPhone) {
        throw { status: 400, message: 'User with this phone number already exists' };
      }
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
      const user = new User({
        fullname,
        email,
        birthdate,
        phone_number,
        role: 'CREATOR',
        profile_picture,
        password: hashedPassword,
      });

      return user.save();
    })
    .then(() => {
      res.status(201).json({ success: true, message: 'User registered successfully' });
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ error: err.message });
      } else {
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    });
};


exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { fullname, email, birthdate, phone_number, password } = req.body;

  User.findByIdAndUpdate(
    userId,
    { fullname, email, birthdate, phone_number, password },
    { new: true }
  )
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};


exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};


exports.loginUser = (req, res) => {
  const { email, phone_number, password } = req.body;
  console.log('Data received in the backend:', { email, phone_number, password });

  if (!email && !phone_number) {
    return res.status(400).json({ error: 'You must provide an email or phone number' });
  }

  User.findOne({
    $or: [{ email }, { phone_number }]
  })
    .then(user => {
      if (!user) {
        throw { status: 400, message: 'Invalid email or phone number' };
      }

      return bcrypt.compare(password, user.password).then(validPassword => {
        if (!validPassword) {
          throw { status: 400, message: 'Invalid password!' };
        }

        const token = jwt.sign(
          { userId: user._id, fullname: user.fullname, email: user.email, profile_picture: user.profile_picture, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.status(200).json({ user, token });
      });
    })
    .catch(err => {
      if (err.status) {
        res.status(err.status).json({ error: err.message });
      } else {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
};



/*
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
}; */
