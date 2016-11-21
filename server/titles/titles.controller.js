'use strict';
const titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address)
  .then((html) => {
    res.status(200).send(html);
  })
  .catch((error) => {
    next(error);
  });
}

exports.retrieve = retrieve;