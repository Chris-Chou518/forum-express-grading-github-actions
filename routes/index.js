const express = require('express')
const router = express.Router()
// 載入 controller
const restController = require('../controllers/restaurant-controller')
// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })
router.get('/restaurants', restController.getRestaurants)
router.use('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
