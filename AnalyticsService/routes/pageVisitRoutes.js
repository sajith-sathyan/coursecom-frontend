// routes/pageVisitRoutes.js

const express = require('express');
const router = express.Router();
const pageVisitController = require('../controllers/pageVisitController');

router.post('/visit', pageVisitController.updatePageVisit);

router.get('/', pageVisitController.getPageVisits);

module.exports = router;
