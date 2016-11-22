'use strict';
const titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address)
    .subscribe(
      html => res.status(200).send(html),
      err => next(err));
}

exports.retrieve = retrieve;