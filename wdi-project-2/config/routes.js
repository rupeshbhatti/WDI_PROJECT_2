const express = require('express');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('homepage'));

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX

// NEW
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// SHOW

// CREATE


// EDIT

// UPDATE

// DELETE


router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

module.exports = router;
