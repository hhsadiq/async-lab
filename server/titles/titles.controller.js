'use strict';
let titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.query.address)
  .then((titles) => {
    res.status(200).sendFile(titles);
  })
  .catch((error) => {
    next(error);
  });
}

exports.retrieve = retrieve;