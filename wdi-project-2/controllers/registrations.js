const User = require('../models/user');

// function to render the registration form
function registrationsNew(req, res) {
  return res.render('registrations/new');
}

function registrationsCreate(req, res, next) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.email}!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
  // .catch((err) => {
  //   if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
  //   next(err);
  // });
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
