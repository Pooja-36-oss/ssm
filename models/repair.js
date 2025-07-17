const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  issue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Repair = mongoose.model('Repair', repairSchema);

module.exports = Repair;
