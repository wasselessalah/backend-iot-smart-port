const mongoose = require('mongoose');


const UtilisateurSchema = new mongoose.Schema({
  id:mongoose.mongoose.Schema.ObjectId,
  name: { type: String, required: true },
  
  RFID: { type: String, required: true ,unique: true ,
    minlength: 8, 
    maxlength: 16  
  },
  
}, {
  timestamps: true
});




const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = Utilisateur;
