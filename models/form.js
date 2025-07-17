const mongoose = require('mongoose');

const serviceFormSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ServiceForm = mongoose.model('ServiceForm', serviceFormSchema);

module.exports = ServiceForm;
