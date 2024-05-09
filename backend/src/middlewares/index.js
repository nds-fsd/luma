const validateEmail = (email) => {
  const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  return pattern.test(email);
};

const validatePassword = (password) => {
  const pattern = new RegExp(/^.{5,}$/);
  return pattern.test(password);
};

const validateSpanishPhoneNumber = (phoneNumber) => {
  const spanishPhoneRegex = /^(?:\+?34)?[69]\d{8}$/;
  return spanishPhoneRegex.test(phoneNumber);
};

const validateFullname = (fullname) => {
  const pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(fullname);
};


const validateUserCreation = (req, res, next) => {
  const { fullname, email, phone_number, password } = req.body;

  if (!validateFullname(fullname)) {
    return res.status(400).json({ error: 'Invalid fullname format' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (!validateSpanishPhoneNumber(phone_number)) {
    return res.status(400).json({ error: 'Invalid spanish phone number format' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be greater than 4 characters' });
  }

  next();
};

module.exports = {
  validateUserCreation,
};
