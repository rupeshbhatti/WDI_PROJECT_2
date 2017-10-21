const express = require('express');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const toons = require('../controllers/toons');
const router  = express.Router();
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// INDEX
router.route('/toons')
  .get(toons.index)
  .post(secureRoute, toons.create);

// NEW
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// SHOW


// CREATE


// EDIT

// UPDATE

// DELETE
router.route('/logout')
  .get(sessions.delete);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

module.exports = router;
