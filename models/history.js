const mongoose = require('mongoose');


const historySchema = new mongoose.Schema({
  id:mongoose.mongoose.Schema.ObjectId,
  name: { type: String, required: true },
  overt: { type: Boolean, required: true },
  
  RFID: { type: String},
  
}, {
  timestamps: true
});




const History = mongoose.model('History', historySchema);
module.exports = History;
