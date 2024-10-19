// routes/pageVisitRoutes.js
const controller = require('../controllers/notification')
const express = require('express');
const   router = express.Router();

router.post("/sendEmailAndMessage",controller.sendEmailAndMessage)


module.exports = router;
