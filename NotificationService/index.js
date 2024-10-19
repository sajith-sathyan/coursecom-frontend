const express = require("express");
const notificationRoute = require("./routes/notficationRoute");
require("dotenv").config();
const nodemailer = require("nodemailer");
const sendMailHelper = require("./services/nodeMailer");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Configure Nodemailer transporter


// Test route for notification


// Use notification routes
app.use("/notification", notificationRoute);

// Start the server and send an email on server start
const PORT = 4747;

app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`)
});
