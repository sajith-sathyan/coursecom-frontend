const express = require('express')
const router = express.Router()
const {updateOrderStatus} = require('../controllers/orderController')


router.post('/updateOrderStatus',updateOrderStatus)

module.exports = router
