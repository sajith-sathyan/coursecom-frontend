const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController")


// POST 
router.post('/signup', adminController.signup)
router.post('/login', adminController.login)
// router.post('/verifyOtp', adminController.verifyOtp)
router.post('/forgotPassword', adminController.forgotPassword)
router.post('/updatePassword', adminController.updatePassword)

module.exports = router;
