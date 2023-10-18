const express = require('express')
const router = express.Router()
const adminController = require('../../../controllers/apis/admin-controller')
const upload = require('../../../middleware/multer')

router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/:id', adminController.getRestaurant)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)
module.exports = router
