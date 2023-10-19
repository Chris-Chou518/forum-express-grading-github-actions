const bcrypt = require('bcryptjs')
const db = require('../models')
const { User, Restaurant, Comment } = db
const { localFileHandler } = require('../helpers/file-helpers')
const userServices = {
  signUp: (req, cb) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Password do not match')
    return User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(user => {
        return cb(null, { user: user.toJSON() })
        // req.flash('success_messages', '成功註冊帳號')
        // return res.redirect('/signin')
      })
      .catch(err => cb(err))
  },
  getTopUsers: (req, cb) => {
    return User.findAll({
      include: [{ model: User, as: 'Followers' }]
    })
      .then(users => {
        const result = users.map(user => ({ // arrow function加小括弧可確保return a object
          ...user.toJSON(),
          followerCount: user.Followers.length,
          isFollowed: req.user.Followings.some(f => f.id === user.id)
        })).sort((a, b) => b.followerCount - a.followerCount)
        return cb(null, { users: result })
      })
      .catch(err => cb(err))
  },
  getUser: (req, cb) => {
    return User.findByPk(req.params.id, {
      // raw: true
      include:
        {
          model: Comment,
          include:
            {
              model: Restaurant,
              attributes: ['image', 'name']
            }
        }
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist.")
        // res.render('users/profile', { user })
        user = user.toJSON()
        const commentData = user.Comments ? user.Comments : []
        // console.log('commentData', user.Comments) // 觀察用
        // console.log('user', user) // 觀察用
        // const userselfId = req.user.id  註解掉不然測試不會過
        return cb(null, {
          user: user,
          commentData
          // userselfId
        })
      })
      .catch(err => cb(err))
  },
  putUser: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('User name is required!')
    const file = req.file
    return Promise.all([
      User.findByPk(req.user.id),
      localFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist")
        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(updatedUser => {
        // req.flash('success_messages', '使用者資料編輯成功')
        return cb(null, { user: updatedUser })
      })
      .catch(err => cb(err))
  }
}
module.exports = userServices
