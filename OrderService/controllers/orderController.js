
const consumePaymentMessages = require('../services/RabbitMQService')
module.exports.updateOrderStatus  =async (req,res)=>{
console.log("updateOrderStatus called")
    try{
        
       
        try {
            const paymentDetials =  consumePaymentMessages()
            console.log("updateOrderStatus ------>",paymentDetials)
            
            console.log(`Order with ID updated `);
          } catch (error) {
            console.error('Error updating order status:', error.message);
            throw error; // You may choose to handle the error differently
          }
    }catch(err){

    }
}