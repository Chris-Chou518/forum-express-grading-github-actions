const bcrypt = require('bcryptjs')
const db = require('../models')
const { User, Restaurant, Comment } = db // const User = db.User的解構
const { localFileHandler } = require('../helpers/file-helpers')
const UserController = {
  signUpPage: (req, res, next) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
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
      .then(() => {
        req.flash('success_messages', '成功註冊帳號')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  // getUser: (req, res, next) => {
  //   return Promise.all([
  //     User.findByPk(req.params.id, {
  //       raw: true
  //     // nest: true,
  //     // include: { model: Comment, include: { model: Restaurant } }
  //     }),
  //     Comment.findAndCountAll({
  //       raw: true,
  //       nest: true,
  //       include: [User, Restaurant],
  //       where: { userId: req.params.id }
  //     })
  //   ])
  //     .then(([user, comments]) => {
  //       if (!user) throw new Error('無此使用者!')
  //       return res.render('users/profile', {
  //         user,
  //         comments
  //       })
  //     })
  //     .catch(err => next(err))
  // },
  getUser: (req, res, next) => {
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
        const userselfId = req.user.id
        res.render('users/profile', {
          user: user,
          commentData,
          userselfId
        })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      raw: true
    })
      .then(user => {
        if (!user) throw new Error('無此使用者!')
        return res.render('users/edit', {
          user
        })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
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
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功')
        return res.redirect(`/users/${req.user.id}`)
      })
      .catch(err => next(err))
  }
}
module.exports = UserController
