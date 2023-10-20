const express = require('express')
const router = express.Router()
// const passport = require('../../config/passport')
const restController = require('../../controllers/apis/restaurant-controller')
const userController = require('../../controllers/apis/user-controller')
const commentController = require('../../controllers/apis/comment-controller')
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth')
const { apiErrorHandler, signinWithErrorHandler } = require('../../middleware/error-handler')
const upload = require('../../middleware/multer')
const admin = require('./modules/admin')
router.use('/admin', authenticated, authenticatedAdmin, admin)
router.post('/signup', userController.signUp)
// router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn) no handle with error
router.post('/signin', signinWithErrorHandler, userController.signIn)
// different style
// router.post('/signin', function (req, res, next) {
//   passport.authenticate('local', { session: false }, function (err, user, info) {
//     if (err) {
//       return next(err)
//     }
//     if (!user) {
//       return res.status(401).json({ message: 'info.message' })
//     }
//     req.logIn(user)
//     next()
//   })(req, res, next)
// }, userController.signIn)
router.get('/restaurants', authenticated, restController.getRestaurants)
router.get('/restaurants/feeds', authenticated, restController.getFeeds)
router.get('/restaurants/top', authenticated, restController.getTopRestaurants)
router.get('/restaurants/:id', authenticated, restController.getRestaurant)
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashboard)
router.delete('/comments/:id', authenticated, authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)
router.get('/users/top', authenticated, userController.getTopUsers)
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)
router.post('/like/:restaurantId', authenticated, userController.addLike)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)
router.use('/', apiErrorHandler)
module.exports = router
