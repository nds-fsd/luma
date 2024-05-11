const validateEmail = (email) => {
  const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  return pattern.test(email);
};


const validateDate = (eventDate) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(eventDate);
  };
  
  const validateTitle = (eventTitle) => {
    return eventTitle.trim() !== '';
  };
  
  const validatePrice = (eventPrice) => {
    return !isNaN(eventPrice) && parseFloat(eventPrice) >= 0;  };
  
  const validateCapacity = (eventCapacity) => {
    if (eventCapacity === "ilimitado") {
        return -1; 
    } else {
        return !isNaN(eventCapacity) && parseInt(eventCapacity) >= 0;
    }
};
  
  const validateEventCreation = (req, res, next) => {
    const { eventDate, eventTitle, eventPrice, eventCapacity } = req.body;
  
    if (!eventDate || !validateDate(eventDate)) {
      return res.status(400).json({ error: 'La fecha del evento es requerida' });
    }
    if (!eventTitle || !validateTitle(eventTitle)) {
      return res.status(400).json({ error: 'El título del evento es requerido' });
    }
    if (!eventPrice || !validatePrice(eventPrice)) {
      return res.status(400).json({ error: 'Debe establecerse un precio válido para la entrada' });
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
  const { fullname, email, phone_number, password, birthdate } = req.body;

  if (!fullname) {
    return res.status(400).json({ error: 'Fullname is required' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!phone_number) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (!birthdate) {
    return res.status(400).json({ error: 'Birthdate is required' });
  }

  const formattedBirthdate = formatDate(birthdate);

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
  validateEventCreation,
  validateUserCreation,
};