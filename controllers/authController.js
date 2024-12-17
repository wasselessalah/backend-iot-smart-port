const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login d'un utilisateur
exports.login = async (req, res) => {
  const { email, mot_passe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(mot_passe))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
      res.json({ message: 'Login successful', token, user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enregistrement d'un utilisateur
exports.register = async (req, res) => {
  const { full_name, email, phone_number, mot_passe, RFID } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    const userExists = await User.findOne({ $or: [{ email }, { phone_number }] });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email or phone number already exists' });
    }

    // Création du nouvel utilisateur
    const user = new User({
      full_name,
      email,
      phone_number,
      mot_passe,
      RFID,
      
    });

    await user.save();

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        RFID: user.RFID,
        
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
