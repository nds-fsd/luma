const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { sendWelcomeEmail } = require('../services/email.service')
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
        role: 'CREATOR',
        profile_picture,
        password: hashedPassword,
      });

      return user.save();
    })
    .then(() => {
      console.log('User registered successfully')
      // Aqui mandaremos el email de bienvenida
      sendWelcomeEmail(email, fullname)
      res.status(201).json({ success: true, message: 'User registered successfully' });
    })
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ error: err.message });
      } else {
        res.status(500).json({ success: false, error: 'Internal server error' }); // Línea 51
      }
    });
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' }); // Línea 66
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
      res.status(500).json({ success: false, error: 'Internal server error' }); // Línea 82
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { fullname, email, birthdate, phone_number, password, role } = req.body;

  User.findByIdAndUpdate(userId, { fullname, email, birthdate, phone_number, password, role }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' }); // Línea 97
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
      res.status(500).json({ success: false, error: 'Internal server error' }); // Línea 108
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
      res.status(500).json({ message: 'Internal server error' }); // Líneas 113-114
    });
};

exports.addSocialNetwork = (req, res) => {
  const userId = req.params.id;
  const { network, username } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.socialNetworks.push({ network, username });
      return user.save();
    })
    .then((updatedUser) => {
      res.json({ success: true, message: 'Social network added successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.getSocialNetworks = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ socialNetworks: user.socialNetworks });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.updateSocialNetworks = (req, res) => {
  const userId = req.params.id;
  const { socialNetworks } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.socialNetworks = socialNetworks;
      return user.save();
    })
    .then((updatedUser) => {
      res.json({ success: true, message: 'Social networks updated successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.deleteSocialNetwork = (req, res) => {
  const userId = req.params.id;
  const { network } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.socialNetworks = user.socialNetworks.filter(sn => sn.network !== network);
      return user.save();
    })
    .then((updatedUser) => {
      res.json({ success: true, message: 'Social network deleted successfully', user: updatedUser });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
};

exports.updateProfilePicture = (req, res) => {
  const userId = req.params.id;
  const { profile_picture } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.profile_picture = profile_picture;

      return user.save();
    })
    .then(user => {
      res.json({ message: 'Profile picture updated successfully', user });
    })
    .catch(error => {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ error: 'Server error' });
    });
};

exports.changePassword = (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return bcrypt.compare(currentPassword, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }

        return bcrypt.hash(newPassword, 10).then(hashedPassword => {
          user.password = hashedPassword;
          return user.save();
        });
      });
    })
    .then(() => {
      res.json({ message: 'Password changed successfully' });
    })
    .catch(error => {
      console.error('Error changing password:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Server error' });
      }
    });
};