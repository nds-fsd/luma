const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 

authRouter.post('/login', async (req, res) => {
  const { email, phone_number, password } = req.body;

  if (!email && !phone_number) {
    return res.status(400).json({ error: 'You must provide an email or phone number' });
  }

  User.findOne({
    $or: [{ email }, { phone_number }],
  })
    .then((user) => {
      if (!user) {
        throw { status: 400, message: 'Invalid email or phone number' };
      }

      return bcrypt.compare(password, user.password).then((validPassword) => {
        if (!validPassword) {
          throw { status: 400, message: 'Invalid password!' };
        }

        const token = jwt.sign(
          {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            profile_picture: user.profile_picture,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.status(200).json({ user, token });
      });
    })
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ error: err.message });
      } else {
        console.error('Server error:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
});

module.exports = authRouter;
