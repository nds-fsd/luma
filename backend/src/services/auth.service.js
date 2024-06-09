const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      profile_picture: user.profile_picture,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const validateJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid Token');
  }
};

module.exports = {
  generateJWT,
  validateJWT,
};
