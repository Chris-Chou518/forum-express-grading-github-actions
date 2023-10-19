const bcrypt = require('bcryptjs')
const db = require('../../models')
const { User } = db // const User = db.User的解構
const userServices = require('../../services/user-services')
const userController = {
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
        return res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    return res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    return res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.render('users/profile', data))
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
    userServices.putUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', '使用者資料編輯成功')
      return res.redirect(`/users/${req.user.id}`)
    })
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  getTopUsers: (req, res, next) => {
    userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', data))
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, (err, data) => err ? next(err) : res.redirect('back'))
  }
}
module.exports = userController
