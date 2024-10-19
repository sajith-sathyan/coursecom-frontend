const sendMailHelper = require("../services/nodeMailer");

module.exports.sendEmailAndMessage = async (req, res) => {
  try {
    const { emails, message } = req.body;
    console.log(req.body)
    // Validate inputs
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ status: false, message: "Invalid email list" });
    }

    if (!message) {
      return res.status(400).json({ status: false, message: "Message content is required" });
    }

    // Send emails
    const result = await sendMailHelper(message, emails);
    console.log("result--->",result)
    // Respond with result
    res.status(200).json(result);
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).json({ status: false, message: "Failed to send emails" });
  }
};
