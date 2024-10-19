// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pageVisitRoutes = require('./routes/pageVisitRoutes');

const app = express();

const PORT = process.env.PORT || 5050;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sajithsathyandeveloper:J4nfcTtFTAkve2Vq@cluster0.wpbiap0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/pageVisits', pageVisitRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
