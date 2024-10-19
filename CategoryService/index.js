const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Import Mongoose

const CategoryRoute = require('./routes/category');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/category', CategoryRoute);

// Connect to MongoDB
mongoose.connect('mongodb+srv://sajithsathyandeveloper:eEwGy16NaurZaYPW@cluster0.ovpysld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`Server started at port ${port}`));
