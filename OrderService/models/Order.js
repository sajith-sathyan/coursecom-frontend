// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
