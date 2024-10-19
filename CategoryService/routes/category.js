const express = require('express')
const router = express.Router()
const controller = require('../controllers/category')

router.post('/addCategory',controller.addCategory)
router.get('/',controller.getCategory)
router.delete('/deleteCategory/:categoryName',controller.deleteCategory)


module.exports = router
