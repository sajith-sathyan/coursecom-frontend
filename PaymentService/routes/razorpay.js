const express = require('express')
const router = express.Router()
const {order,verify} = require('../controllers/razorpay')


router.post('/order',order)
router.post('/verify',verify)

module.exports = router
