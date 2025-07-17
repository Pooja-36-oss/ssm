const mongoose = require('mongoose');

const virtualVisitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  datetime: { type: Date, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const VirtualVisit = mongoose.model('VirtualVisit', virtualVisitSchema);

module.exports = VirtualVisit;
