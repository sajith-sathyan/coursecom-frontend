// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const order = require('./routes/order')
const app = express();

const PORT = process.env.PORT || 3040;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/page_visits_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/order',order );

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
