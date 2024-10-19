const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const { MONGOURL, PORT } = require("./config/config");
const connectToMongoDB = require("./config/mongoose");
const adminRoute = require('./routes/adminRoutes')

const app = express();

// mongodb connection
connectToMongoDB(MONGOURL)
  .then((connection) => {
    console.log("MongoDB connection success");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use("/admin", adminRoute);

// server connection
const server = app.listen(PORT, "localhost", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
