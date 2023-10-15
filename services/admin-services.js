const { Restaurant, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')
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
  },
  deleteRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id)
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist")
        return restaurant.destroy()
      })
      .then(deleteRestaurant => {
        return cb(null, { restaurant: deleteRestaurant })
      })
      .catch(err => cb(err))
  },
  postRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')
    const file = req.file // 把檔案取出來，也可以寫成const { file } = req
    return localFileHandler(file) // 把取出的檔案傳給 file-helper 處理後
      .then(filePath => Restaurant.create({ // 再 create 這筆餐廳資料
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      }))

      .then(newRestaurant => cb(null, { restaurant: newRestaurant }))
      .catch(err => cb(err))
  }
}

module.exports = adminServices
