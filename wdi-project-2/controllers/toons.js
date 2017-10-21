const Toon = require('../models/toon');

function indexRoute(req, res, next) {
  Toon
    .find()
    .populate('createdBy')
    .exec()
    .then((toons) => res.render('toons/index', { toons }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('toons/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.email;

  Toon
    .create(req.body)
    .then(() => res.redirect('/toons'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/toons/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

// function showRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .populate('createdBy comments.createdBy')
//     .exec()
//     .then(hotel => {
//       if(!hotel) return res.notFound();
//       return res.render('hotels/show', { hotel });
//     })
//     .catch(next);
// }
//
// function editRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .exec()
//     .then(hotel => {
//       if(!hotel) return res.redirect();
//       if(!hotel.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
//       return res.render('hotels/edit', { hotel });
//     })
//     .catch(next);
// }
//
// function updateRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .exec()
//     .then(hotel => {
//       if(!hotel) return res.notFound();
//       if(!hotel.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
//
//       for(const field in req.body) {
//         hotel[field] = req.body[field];
//       }
//
//       return hotel.save();
//     })
//     .then(() => res.redirect(`/hotels/${req.params.id}`))
//     .catch((err) => {
//       if(err.name === 'ValidationError') return res.badRequest(`/hotels/${req.params.id}/edit`, err.toString());
//       next(err);
//     });
// }
//
// function deleteRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .exec()
//     .then(hotel => {
//       if(!hotel) return res.notFound();
//       if(!hotel.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
//       return hotel.remove();
//     })
//     .then(() => res.redirect('/hotels'))
//     .catch(next);
// }
//
// function createCommentRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .exec()
//     .then(hotel => {
//       if (!hotel) return res.notFound();
//
//       req.body.createdBy = req.user;
//       hotel.comments.push(req.body);
//
//       return hotel.save();
//     })
//     .then(() => res.redirect(`/hotels/${req.params.id}`))
//     .catch((err) => {
//       if (err.name === 'ValidationError') res.badRequest(`/hotels/${req.params.id}`, err.toString());
//       next(err);
//     });
// }
//
// function deleteCommentRoute(req, res, next) {
//   Hotel
//     .findById(req.params.id)
//     .exec()
//     .then(hotel => {
//       if (!hotel) return res.notFound();
//       if (!hotel.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
//       hotel.comments.id(req.params.commentId).remove();
//
//       return hotel.save();
//     })
//     .then(hotel => res.redirect(`/hotels/${hotel.id}`))
//     .catch(next);
// }

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute
};
