const User = require('../models/user');

function authentication(req, res, next) {

  if(!req.session.isAuthenticated) return next();

  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          return res.redirect('/login');
        });
      }

      req.session.email = user.email;
      res.locals.user = user;
      res.locals.isAuthenticated = true;
      console.log(res.locals.isAuthenticated);

      next();
    });
}

module.exports = authentication;
