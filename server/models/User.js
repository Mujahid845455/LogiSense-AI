const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  terminalId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['dispatcher', 'manager', 'driver'], default: 'dispatcher' },
});

module.exports = mongoose.model('User', userSchema);
