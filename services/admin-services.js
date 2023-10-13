const { Restaurant, Category } = require('../models')
const adminServices = {
  getRestaurants: (req, cb) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        // console.log(restaurants)觀察資料類型(nest: true)
        return cb(null, { restaurants })
      })
      .catch(err => cb(err))
  }
}

module.exports = adminServices
