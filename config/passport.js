const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJwt = require('passport-jwt')
const bcrypt = require('bcryptjs')
const { User, Restaurant } = require('../models')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
// set up Passport Strategy
passport.use(new LocalStrategy({
  // customize user field
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
// authenticate user
(req, email, password, cb) => {
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      bcrypt.compare(password, user.password)
        .then(res => {
          if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
          return cb(null, user)
        })
    })
}))
// set up passport jwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}
passport.use(new JwtStrategy(jwtOptions, (req, jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {
    include: [
      { model: Restaurant, as: 'FavoritedRestaurants' },
      { model: Restaurant, as: 'likedRestaurants' },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  })
    .then(user => {
      req.user = user
      return cb(null, user)
    })
    .catch(err => cb(err))
}))
// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  return User.findByPk(id, {
    include: [
      { model: Restaurant, as: 'FavoritedRestaurants' },
      { model: Restaurant, as: 'likedRestaurants' },
      { model: User, as: 'Followers' },
      { model: User, as: 'Followings' }
    ]
  })
    .then(user => {
      user = user.toJSON()
      // console.log(user) 觀察資料
      return cb(null, user)
    })
    .catch(err => cb(err))
})
module.exports = passport
