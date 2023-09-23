const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db // const User = db.User的解構
const UserController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res) => {
    return bcrypt.hash(req.body.password, 10)
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => { return res.redirect('/signin') })
  }
}
module.exports = UserController
