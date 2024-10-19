// routes/pageVisitRoutes.js

const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllers');

router.post('/courseBuyedUserUpdation', Controller.courseBuyedUserUpdation);
router.post('/checkPurchaseStatus', Controller.checkPurchaseStatus);
router.post('/userBuyedCourseUpdation',Controller.userBuyedCourseUpdation)

router.get('/getCourseById/:id',Controller.getCourseById)
router.get('/getUserById/:id',Controller.getUserById)

module.exports = router;
