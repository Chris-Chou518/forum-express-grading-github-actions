const passport = require('../config/passport')
module.exports = {
  generalErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      req.flash('error_messages', `${err.name}:${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }
    res.redirect('back')
    next(err)
  },
  apiErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        status: 'err',
        message: `${err.name}: ${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'err',
        message: `${err}`
      })
    }
    next(err)
  },
  signinWithErrorHandler (req, res, next) {
    passport.authenticate('local', { session: false }, function (err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Wrong email or password'
        })
      }
      req.logIn(user)
      next()
    })(req, res, next)
  }
}
