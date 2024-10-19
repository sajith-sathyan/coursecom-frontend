const mongoose = require("mongoose");

function connectToMongoDB(url) {
  return new Promise((resolve, reject) => {
    mongoose.connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
      resolve(mongoose.connection);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      reject(error);
    });
  });
}

module.exports = connectToMongoDB;
