const express = require('express')
const router = express.Router()

// import controller
const homeController = require('./../controllers/homeController')

// GET home page
router.get('/', homeController.index)

// GET results page
router.get('/results', homeController.book_search)

module.exports = router
