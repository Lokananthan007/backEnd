// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  place: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photo: { type: String } 
});

module.exports = mongoose.model('User', userSchema);
