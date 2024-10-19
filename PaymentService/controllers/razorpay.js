const Razorpay = require("razorpay");
const crypto = require("crypto");
const RabbitMQService = require('../services/RabbitMQService')
module.exports.order = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: crypto.randomBytes(16).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// payment verify

module.exports.verify = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSign = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(sign)
        .digest("hex");
  
      // Compare the computed signature with the razorpay_signature
      if (razorpay_signature === expectedSign) {
        const sendingData = 'this message send throw rabittmq'
        RabbitMQService.messageSender(req.app.locals.channel,req.app.locals.queue,sendingData)
        return res.status(200).json({ message: 'Payment verified successfully' ,PaymentStatus:true});
      } else {
        return res.status(400).json({ message: 'Invalid signature sent' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  