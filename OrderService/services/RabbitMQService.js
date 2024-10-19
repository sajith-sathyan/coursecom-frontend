const amqp = require('amqplib');
const { updateOrderStatus } = require('./orderService');

async function consumePaymentMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchangeName = 'payments_exchange';

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, exchangeName, '');

    console.log('Waiting for payment messages...');

    channel.consume(queue, (msg) => {
      const paymentData = JSON.parse(msg.content.toString());
      console.log('Received payment data:', paymentData);
      
      channel.ack(msg);
      return paymentData
    });
  } catch (error) {
    console.error('Error consuming payment messages:', error);
  }
}

consumePaymentMessages();
