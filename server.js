const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ServiceForm = require('./models/form'); // ✅ Ensure this path is correct

const app = express();

// ✅ Middleware
app.use(express.json()); // For JSON data (like from fetch)
app.use(express.urlencoded({ extended: true })); // For form-encoded data
app.use(express.static('public')); // For serving frontend static files (HTML, CSS, JS)

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://Pooja:ssm123@cluster0.qw2jc5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('SSM backend is working!');
});

// ✅ Handle form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, phoneNumber, serviceType, message } = req.body;

  const newForm = new ServiceForm({
    firstName,
    lastName,
    email,
    phoneNumber,
    serviceType,
    message
  });

  newForm.save()
    .then(() => {
      res.status(200).json({ success: true, message: 'Form submitted successfully!' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Error submitting form: ' + err.message });
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


// Import model
const Repair = require('./models/repair');

// Handle repair form POST
app.post('/submit-repair', (req, res) => {
  const { name, email, issue } = req.body;

  const newRepair = new Repair({
    name,
    email,
    issue
  });

  newRepair.save()
    .then(() => {
      res.status(200).json({ success: true, message: 'Repair request submitted successfully!' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Error submitting repair request: ' + err.message });
    });
});

const VirtualVisit = require('./models/virtualvisit');

app.post('/submit-virtual-visit', (req, res) => {
  const { name, email, datetime, message } = req.body;

  const newVisit = new VirtualVisit({
    name,
    email,
    datetime,
    message
  });

  newVisit.save()
    .then(() => {
      res.status(200).json({ success: true, message: 'Virtual visit booked successfully!' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Error booking virtual visit: ' + err.message });
    });
});
