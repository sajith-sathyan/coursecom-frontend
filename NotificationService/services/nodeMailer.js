const nodemailer = require("nodemailer");

const sendMailHelper = (message,toMail) => {
 
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USERMAIL,
        pass: process.env.APPPASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "courseCom",
        address:  process.env.USERMAIL,
      },
      to: toMail,
      subject: "message from courseCom",
      text: message,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Failed to send email:", err);
        resolve({ status: false, message: "Failed to send email" });
      } else {
        console.log("Email sent successfully")

        resolve({ status: true, message: "Email sent successfully" });
      }
    });
  });
};

module.exports = sendMailHelper;