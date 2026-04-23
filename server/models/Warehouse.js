const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  load: { type: Number, default: 0 },
  queue: { type: Number, default: 0 },
  status: { type: String, enum: ['Nominal', 'Elevated', 'Critical'], default: 'Nominal' },
  color: { type: String, enum: ['emerald', 'yellow', 'red'], default: 'emerald' },
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
