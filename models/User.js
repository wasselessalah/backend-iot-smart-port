const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  id:mongoose.mongoose.Schema.ObjectId,
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  mot_passe: { type: String, required: true },
  RFID: { type: String, required: true ,
    minlength: 8, 
    maxlength: 16  
  },

}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('mot_passe')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.mot_passe, salt);
    this.mot_passe = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.mot_passe);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
