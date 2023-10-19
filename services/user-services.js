const bcrypt = require('bcryptjs')
const db = require('../models')
const { User, Restaurant, Comment, Favorite, Followship, Like } = db
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
  },
  addFavorite: (req, cb) => {
    const { restaurantId } = req.params
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      Favorite.findOne({
        where: {
          userId: req.user.id,
          restaurantId
        }
      })
    ])
      .then(([restaurant, favorite]) => {
        if (!restaurant) throw new Error("restaurant didn't exist")
        if (favorite) throw new Error('You have favorited this restaurant!')
        return Favorite.create({
          userId: req.user.id,
          restaurantId
        })
      })
      .then(favorite => cb(null, { favorite }))
      .catch(err => cb(err))
  },
  removeFavorite: (req, cb) => {
    return Favorite.findOne({
      where: {
        userId: req.user.id,
        restaurantId: req.params.restaurantId
      }
    })
      .then(favorite => {
        if (!favorite) throw new Error("You haven't favorited this restaurant")
        return favorite.destroy()
      })
      .then(removedFavorite => cb(null, { favorite: removedFavorite }))
      .catch(err => cb(err))
  },
  addLike: (req, cb) => {
    return Promise.all([
      Restaurant.findByPk(req.params.restaurantId),
      Like.findOne({
        where: {
          userId: req.user.id,
          restaurantId: req.params.restaurantId
        }
      })
    ])
      .then(([restaurant, like]) => {
        if (!restaurant) throw new Error("Restaurant don't exist")
        if (like) throw new Error('You have liked this restaurant!')
        return Like.create({
          userId: req.user.id,
          restaurantId: req.params.restaurantId
        })
      })
      .then(like => cb(null, { like }))
      .catch(err => cb(err))
  },
  removeLike: (req, cb) => {
    return Like.findOne({
      where: {
        userId: req.user.id,
        restaurantId: req.params.restaurantId
      }
    })
      .then(like => {
        if (!like) throw new Error("You haven't liked this restaurant!")
        return like.destroy()
      })
      .then(removedLike => cb(null, { like: removedLike }))
      .catch(err => cb(err))
  },
  addFollowing: (req, cb) => {
    return Promise.all([
      User.findByPk(req.params.userId),
      Followship.findOne({
        where: {
          followerId: req.user.id,
          followingId: req.params.userId
        }
      })
    ])
      .then(([user, followship]) => {
        if (!user) throw new Error("User didn't exist")
        if (followship) throw new Error('You are already following this user!')
        return Followship.create({
          followerId: req.user.id,
          followingId: req.params.userId
        })
      })
      .then(followship => cb(null, { followship }))
      .catch(err => cb(err))
  },
  removeFollowing: (req, cb) => {
    return Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then(followship => {
        if (!followship) throw new Error("You haven't followed this user!")
        return followship.destroy()
      })
      .then(removedFollowship => cb(null, { followship: removedFollowship }))
      .catch(err => cb(err))
  }
}
module.exports = userServices
