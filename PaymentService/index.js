const express = require('express')
const cors = require('cors')
const dotenv   = require('dotenv')
const Razorpay = require('./routes/razorpay')
const Stripe = require('./routes/stripe')
const amqp = require('amqplib');


const app = express()

dotenv.config()


app.use(express.json())
// app.use(cors())
// // test rabittmq connection 
// (async () => {
//     try {
//         const queue = 'session';
//         const conn = await amqp.connect('amqp://localhost');
//         const ch1 = await conn.createChannel();
//         await ch1.assertQueue(queue);
//         app.locals.channel = ch1;
//         app.locals.queue = queue;
//         console.log('Connected to RabbitMQ');
//     } catch (error) {
//         console.error('Error connecting to RabbitMQ:', error);
//     }
// })();

app.use('/razorpay',Razorpay)
app.use('/stripe',Stripe)

const port  = process.env.PORT || 6060
app.listen(port,()=>console.log(`server start at port ${port}`))