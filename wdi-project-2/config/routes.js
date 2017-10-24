const express = require('express');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const toons = require('../controllers/toons');
const router  = express.Router();
const secureRoute = require('../lib/secureRoute');

// A home route
router.get('/', (req, res) => res.render('homepage'));

//toons middleware
router.route('/toons')
  .get(secureRoute, toons.index)
  .post(secureRoute, toons.create);

router.route('/toons/new')
  .get(secureRoute, toons.new);

router.route('/toons/:id')
  .get(toons.show)
  .put(secureRoute, toons.update)
  .delete(secureRoute, toons.delete);

router.route('/toons/:id/edit')
  .get(secureRoute, toons.edit);

router.route('/toons/:id/comments')
  .post(secureRoute, toons.createComment);

router.route('/toons/:id/comments/:commentId')
  .delete(secureRoute, toons.deleteComment);

//registrations middleware
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/profile')
  .get(secureRoute, registrations.show)
  .put(secureRoute, registrations.update)
  .delete(secureRoute, registrations.delete);

router.route('/profile/edit')
  .get(secureRoute, registrations.edit);

//sessions middleware
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
