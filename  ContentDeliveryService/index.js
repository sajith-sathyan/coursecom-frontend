// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CDS = require('./routes/routes')

const app = express();

const PORT = process.env.PORT || 3040;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sajith:QBBhqPFJbSIzVUdV@cluster0.eikhfnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());



// Routes
app.use('/CDS',CDS)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
