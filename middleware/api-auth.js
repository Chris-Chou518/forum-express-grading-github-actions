const passport = require('../config/passport')
// const authenticated = passport.authenticate('jwt', { session: false })
// 客製化postman上unauthorized訊息，需要有res才能客製化
// const authenticated = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
//     next()
//   })(req, res, next)
// }
const authenticated = (req, res, next) => {
  const middleware = passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' })
    // req.user = user // let req.user have data or set up passport jwtOptions
    next()
  })
  middleware(req, res, next)
}
const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next()
  // console.log(req.user)
  return res.status(403).json({ status: 'error', message: 'permission denied' })
}
module.exports = {
  authenticated,
  authenticatedAdmin
}
