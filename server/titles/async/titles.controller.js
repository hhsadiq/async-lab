'use strict';
const titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address, (err, html) => {
    if (err) {
      next(err);
    }
    res.status(200).send(html);
  });
}

exports.retrieve = retrieve;