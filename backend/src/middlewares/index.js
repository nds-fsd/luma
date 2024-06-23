const UserModel = require('../models/userModel');
const { validateJWT } = require('../services/auth.service');

const jwtMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = validateJWT(token);

    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid Token') {
      return res.status(401).json({ message: 'Invalid Token' });
    } else {
      return res.status(500).json({ message: 'Error fetching user', error });
    }
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};


const validateEmail = (email) => {
  const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  return pattern.test(email);
};

const validateDate = (eventDate) => {
  console.log(eventDate, 'Event Date');
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(eventDate);
};

const validateTitle = (eventTitle) => {
  return eventTitle.trim() !== '';
};

const validatePrice = (eventPrice) => {
  console.log('Event Price', eventPrice);
  return !isNaN(eventPrice) && parseFloat(eventPrice) >= 0;
};

const validateCapacity = (eventCapacity) => {
  console.log('Event Capacity', eventCapacity);
  if (eventCapacity === -1) {
    return true;
  } else {
    return !isNaN(eventCapacity) && parseInt(eventCapacity) >= 0;
  }
};

const validateImage = (eventPicture) => {
  console.log('Event Picture', eventPicture);
  
  const urlPattern = new RegExp(/^(http|https):\/\/[^\s$.?#].[^\s]*$/);
  const base64Pattern = new RegExp(/^data:image\/(jpeg|png|gif|bmp|webp);base64,[a-zA-Z0-9+/=]+$/);
  const maxSize = 5 * 1024 * 1024;

  if (urlPattern.test(eventPicture)) {
    return eventPicture;
  } else if (base64Pattern.test(eventPicture)) {
    const base64Size = (eventPicture.length * (3/4)) - ((eventPicture.endsWith('==')) ? 2 : (eventPicture.endsWith('=')) ? 1 : 0);
    if (base64Size <= maxSize) {
      return eventPicture;
    } else {
      console.error("la imagen excede el tamaño máximo permitido");
      return null;
    }
  } else {
    console.error("URl o formato de imagen inválido");
    return null;
  }
};

const validateEventCreation = (req, res, next) => {
  console.log(req.body);
  const { eventDate, eventTitle, eventPrice, eventCapacity, eventPicture } = req.body;
  console.log(typeof eventPrice);
  console.log(eventCapacity);

  if (!eventDate || !validateDate(eventDate)) {
    return res.status(400).json({ error: 'La fecha del evento es requerida' });
  }
  if (!eventTitle || !validateTitle(eventTitle)) {
    return res.status(400).json({ error: 'El título del evento es requerido' });
  }
  if (eventPrice === undefined || eventPrice === null) {
    return res.status(400).json({ error: 'El precio del evento es requerido' });
  } else {
    if (!validatePrice(eventPrice)) {
      return res.status(400).json({ error: 'El precio del evento no es válido' });
    }
  }

  if (!eventPicture || !validateImage(eventPicture)) {
    return res.status(400).json({ error: 'Debe seleccionar una imagen válida' });
  }

  if (eventCapacity === undefined || eventCapacity === null) {
    return res.status(400).json({ error: 'La capacidad del evento es requerida' });
  }
  if (!validateCapacity(eventCapacity)) {
    return res.status(400).json({ error: 'La capacidad del evento no es válida' });
  }

  next();
};

const validatePassword = (password) => {
  const pattern = new RegExp(/^.{8,}$/);
  return pattern.test(password);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex =
    /^(?:(?:\+|00)([1-9]\d{0,2}))?[-. ]?(\d{1,})[-. ]?(\d{1,})[-. ]?(\d{1,})[-. ]?(\d{1,})[-. ]?(\d{1,})[-. ]?(\d{1,})$/;
  return phoneRegex.test(phoneNumber);
};

const validateFullname = (fullname) => {
  const pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(fullname);
};

const validateUserCreation = (req, res, next) => {
  const { fullname, email, phone_number, password, birthdate, profile_picture } = req.body;

  if (!fullname) {
    return res.status(400).json({ error: 'Fullname is required' });
  }
  if (!validateFullname(fullname)) {
    return res.status(400).json({ error: 'Invalid fullname format' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (!birthdate) {
    return res.status(400).json({ error: 'Birthdate is required' });
  }
  if (!profile_picture) {
    req.body.profile_picture = 'https://res.cloudinary.com/lumatic/image/upload/v1719153810/Lumatic/n7qqv8fulxqj9vsvopir.png';
  }
  if (!phone_number) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  if (!validatePhoneNumber(phone_number)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be greater than 4 characters' });
  }

  const currentDate = new Date();
  const userBirthdate = new Date(birthdate);
  let userAge = currentDate.getFullYear() - userBirthdate.getFullYear();
  const monthDiff = currentDate.getMonth() - userBirthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < userBirthdate.getDate())) {
    userAge--;
  }
  if (userAge < 18) {
    return res.status(400).json({ error: 'You must be at least 18 years old to sign up' });
  }

  const formattedBirthdate = formatDate(birthdate);

  req.body.birthdate = formattedBirthdate;

  next();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

module.exports = {
  jwtMiddleware,
  adminMiddleware,
  validateEventCreation,
  validateUserCreation,
};
