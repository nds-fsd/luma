require('dotenv').config();  // Asegúrate de cargar .env primero

const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      profile_picture: user.profile_picture,
      role: user.role,
      socialNetworks: user.socialNetworks,
    },
    process.env.JWT_SECRET || 'DeXn4*SEYLYqTe0Kq<VR~Yh7G&x>4m£',
    { expiresIn: '1d' }
  );
};

const validateJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'DeXn4*SEYLYqTe0Kq<VR~Yh7G&x>4m£');
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

module.exports = {
  generateJWT,
  validateJWT,
};
