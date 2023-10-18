const { Restaurant, Category, User } = require('../models')
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
  },
  getRestaurant: (req, cb) => {
    return Restaurant.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurant => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return cb(null, { restaurant })
      })
      .catch(err => cb(err))
  },
  putRestaurant: (req, cb) => {
    const { name, tel, address, openingHours, description, categoryId } = req.body
    if (!name) throw new Error('Restaurant name is required!')
    const file = req.file
    return Promise.all([
      Restaurant.findByPk(req.params.id), // 去資料庫查有沒有這間餐廳
      localFileHandler(file) // 把檔案傳到 file-helper 處理
    ])
      .then(([restaurant, filePath]) => { // 以上兩樣事都做完以後
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        return restaurant.update({ // 修改這筆資料
          name,
          tel,
          address,
          openingHours,
          description,
          image: filePath || restaurant.image, // 如果 filePath 是 Truthy (使用者有上傳新照片) 就用 filePath，是 Falsy (使用者沒有上傳新照片) 就沿用原本資料庫內的值
          categoryId
        })
      })
      .then(updatedRestaurant => {
        return cb(null, { restaurant: updatedRestaurant })
      })
      .catch(err => cb(err))
  },
  getUsers: (req, cb) => {
    return User.findAll({
      raw: true
    })
      .then(users => {
        return cb(null, { users })
      })
      .catch(err => cb(err))
  },
  patchUser: (req, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error('There is no the user')
        if (user.email === 'root@example.com') throw new Error('禁止變更 root 權限')
        // {
        //   req.flash('error_messages', '禁止變更 root 權限')
        //   return res.redirect('back')
        // }
        return user.update({
          isAdmin: !user.isAdmin
        })
      })
      .then(updatedUser => {
        // req.flash('success_messages', '使用者權限變更成功')
        return cb(null, { user: updatedUser.toJSON() })
      })
      .catch(err => cb(err))
  }
}

module.exports = adminServices
