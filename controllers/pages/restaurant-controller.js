const restaurantServices = require('../../services/restaurant-services')
const restaurantController = {
  getRestaurants: (req, res, next) => {
    restaurantServices.getRestaurants(req, (err, data) => { err ? next(err) : res.render('restaurants', data) })
  },
  getRestaurant: (req, res, next) => {
    restaurantServices.getRestaurant(req, (err, data) => { err ? next(err) : res.render('restaurant', data) })
    // return Restaurant.findByPk(req.params.id, {
    //   nest: true,
    //   include: [
    //     Category,
    //     { model: Comment, include: User },
    //     { model: User, as: 'FavoritedUsers' },
    //     { model: User, as: 'likedUsers' }
    //   ]
    // })
    //   .then(restaurant => {
    //     // console.log(restaurant.Comments[0].dataValues) 觀察用
    //     if (!restaurant) throw new Error("Restaurant didn't exist!")
    //     return restaurant.increment('view_counts', { by: 1 })
    //   })
    //   .then(restaurant => {
    //     const isFavorited = restaurant.FavoritedUsers.some(f => f.id === req.user.id)
    //     const isLiked = restaurant.likedUsers.some(l => l.id === req.user.id)
    //     return res.render('restaurant', {
    //       restaurant: restaurant.toJSON(),
    //       isFavorited,
    //       isLiked
    //     })
    //   })
    //   .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    restaurantServices.getDashboard(req, (err, data) => { err ? next(err) : res.render('dashboard', data) })
    // return Restaurant.findByPk(req.params.id, {
    //   // raw: true,
    //   // nest: true,
    //   include: [
    //     Category,
    //     { model: Comment, include: User }
    //     // { model: User, as: 'FavoritedUsers' }
    //   ]
    // })
    //   .then(restaurant => {
    //     if (!restaurant) throw new Error('Restaurant does nos exist!')
    //     // const favoritedCount = restaurant.FavoritedUsers.length
    //     return res.render('dashboard', {
    //       restaurant: restaurant.toJSON()
    //       // favoritedCount
    //     })
    //   })
    //   .catch(err => next(err))
  },
  getFeeds: (req, res, next) => {
    restaurantServices.getFeeds(req, (err, data) => { err ? next(err) : res.render('feeds', data) })
    // return Promise.all([
    //   Restaurant.findAll({
    //     limit: 10,
    //     order: [['createdAt', 'DESC']],
    //     include: [Category],
    //     raw: true,
    //     nest: true
    //   }),
    //   Comment.findAll({
    //     limit: 10,
    //     order: [['createdAt', 'DESC']],
    //     include: [User, Restaurant],
    //     raw: true,
    //     nest: true
    //   })
    // ])
    //   .then(([restaurants, comments]) => {
    //     return res.render('feeds', {
    //       restaurants,
    //       comments
    //     })
    //   })
    //   .catch(err => next(err))
  },
  getTopRestaurants: (req, res, next) => {
    restaurantServices.getTopRestaurants(req, (err, data) => { err ? next(err) : res.render('top-restaurants', data) })
    // return Restaurant.findAll({
    //   include: { model: User, as: 'FavoritedUsers' }
    // })
    //   .then(restaurants => {
    //     const result = restaurants.map(r => ({
    //       ...r.toJSON(),
    //       favoritedCount: r.FavoritedUsers.length
    //     }))
    //       .sort((a, b) => b.favoritedCount - a.favoritedCount)
    //       .slice(0, 10) // get top 10
    //     return res.render('top-restaurants', {
    //       restaurants: result
    //     })
    //   })
    //   .catch(err => next(err))
  }
}
module.exports = restaurantController
