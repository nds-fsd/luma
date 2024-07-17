const express = require('express');
const User = require('../models/userModel');
const authRouter = express.Router();
const bcrypt = require('bcrypt'); 
const { generateJWT } = require('../services/auth.service');


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

        const token = generateJWT(user);

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
