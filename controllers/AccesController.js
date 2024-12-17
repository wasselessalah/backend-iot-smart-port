const Utilisateur = require("../models/Utilisateur");


exports.createUtilisateur = async (req, res) => {
  const { name, RFID } = req.body;
  try {
    const existingUtilisateur = await Utilisateur.findOne({ RFID });
    if (existingUtilisateur) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet RFID existe déjà." });
    }

    const newUtilisateur = new Utilisateur({ name, RFID });
    await newUtilisateur.save();

    res.status(201).json({
      message: "Utilisateur créé et ajouté à la liste d'accès avec succès.",
      utilisateur: newUtilisateur,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccessList = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();

    
    res.status(200).json({
      message: "Liste complète des utilisateurs récupérée avec succès.",
      data: utilisateurs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkRFIDInAccessList = async (req, res) => {
  const { RFID } = req.body;

  try {
    const utilisateur = await Utilisateur.find({ RFID });
    let access = false;
    if (utilisateur.length > 0) {
      access = true;
    }

    res.status(200).json({access:access})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
