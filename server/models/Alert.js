const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['traffic', 'temperature', 'fuel', 'weather', 'general'], required: true },
  severity: { type: String, enum: ['critical', 'high', 'medium', 'low'], required: true },
  title: { type: String, required: true },
  shipmentId: { type: String },
  route: { type: String },
  message: { type: String, required: true },
  icon: { type: String },
  color: { type: String },
  action1: { type: String },
  action2: { type: String },
  resolved: { type: Boolean, default: false },
  time: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
