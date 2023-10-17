const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
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
  }
}
module.exports = userServices
