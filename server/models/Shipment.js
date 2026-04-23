const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['planned', 'in_transit', 'delayed', 'delivered'], default: 'planned' },
  riskScore: { type: Number, default: 0 },
  currentLocation: { type: String },
  speed: { type: Number, default: 0 },
  driver: { type: String },
  vehicle: { type: String },
  eta: { type: String },
  cargo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
