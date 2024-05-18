const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, birthdate, phone_number, password } = req.body;
    
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Verificar si ya existe un usuario con el mismo número de teléfono
    const existingUserByPhone = await User.findOne({ phone_number });
    if (existingUserByPhone) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Define el valor por defecto de role
    const role = 'CREATOR';
    //const profile_picture = ''; // Puedes establecer un valor por defecto para la foto de perfil si es necesario

    const user = new User({
      fullname,
      email,
      birthdate,
      phone_number,
      role,  // Asigna el rol por defecto
      profile_picture,
      password
    });

    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullname, email, birthdate, phone_number, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullname, email, birthdate, phone_number, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
