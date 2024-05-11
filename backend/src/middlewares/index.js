
//validaciones de fechas y precio
//para fecha año/mes/dia

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

  
  module.exports = {
    validateEventCreation,
  };