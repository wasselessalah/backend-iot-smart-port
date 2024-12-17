const History = require("../models/history");
const Utilisateur = require("../models/Utilisateur");

exports.createHistory = async (req, res) => {
  const { RFID } = req.body;
  try {
    // Recherche de l'utilisateur avec le RFID fourni
    const existingUtilisateur = await Utilisateur.findOne({ RFID });

    // Déterminer le nom en fonction de l'existence de l'utilisateur
    const name = existingUtilisateur ? existingUtilisateur.name : "Inconnu";
    const ov = existingUtilisateur ? true : false;

    // Création d'un nouvel enregistrement dans l'historique
    const newHistory = new History({
      name,
      overt: ov,
      RFID,
    });

    await newHistory.save();

    res.status(201).json({
      message: "Historique créé avec succès.",
      history: newHistory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const historyList = await History.find();

    res.status(200).json({
      message: "Liste complète des history récupérée avec succès.",
      data: historyList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
