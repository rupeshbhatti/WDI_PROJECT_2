const User = require('../models/user');

// function to render the registration form
function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {

  const sampleFile = req.files.avatar;

  sampleFile.mv(`/Users/rupeshbhatti/Development/WDI_PROJECT_2/wdi-project-2/src/images/avatars/${sampleFile.name}`, function(err) {
    if (err)
      console.log(err);
  });

  req.body.avatar = `/images/avatars/${sampleFile.name}`;

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
}

function showRoute(req, res) {
  return res.render('registrations/show');
}

function editRoute(req, res) {
  return res.render('registrations/edit');
}

function updateRoute(req, res, next) {

  const sampleFile = req.files.avatar;

  sampleFile.mv(`/Users/rupeshbhatti/Development/WDI_PROJECT_2/wdi-project-2/src/images/avatars/${sampleFile.name}`, function(err) {
    if (err)
      console.log(err);
  });

  req.body.avatar = `/images/avatars/${sampleFile.name}`;
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
    .then(() => {
      req.flash('info', `Your profile was updated, ${req.user.email}!`);
      res.redirect('/toons');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile/edit', err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  return req.user.remove()
    .then(() => {
      req.session.regenerate(() => res.redirect('/'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
