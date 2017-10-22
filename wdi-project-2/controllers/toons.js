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
  req.body.createdBy = req.user;

  Toon
    .create(req.body)
    .then(() => res.redirect('/toons'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/toons/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(toon => {
      if(!toon) return res.notFound();
      return res.render('toons/show', { toon });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .exec()
    .then(toon => {
      if(!toon) return res.redirect();
      if(!toon.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('toons/edit', { toon });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .exec()
    .then(toon => {
      if(!toon) return res.notFound();
      if(!toon.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        toon[field] = req.body[field];
      }

      return toon.save();
    })
    .then(() => res.redirect(`/toons/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/toons/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .exec()
    .then(toon => {
      if(!toon) return res.notFound();
      if(!toon.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return toon.remove();
    })
    .then(() => res.redirect('/toons'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .exec()
    .then(toon => {
      if (!toon) return res.notFound();
      req.body.createdBy = req.user;
      toon.comments.push(req.body);

      return toon.save();
    })
    .then(() => res.redirect(`/toons/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.badRequest(`/toons/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Toon
    .findById(req.params.id)
    .exec()
    .then(toon => {
      if (!toon) return res.notFound();

      if (!toon.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that comment');

      toon.comments.id(req.params.commentId).remove();

      return toon.save();
    })
    .then(toon => res.redirect(`/toons/${toon.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
