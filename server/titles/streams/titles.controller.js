'use strict';
const titlesService = require('./titles.service');
const titleHelpers = require('../titles.helpers');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  return titlesService.retrieve(req.query.address)
    .toArray() /* returns Observable containing one emission with all values in an array */
    .toPromise() /* express knows how to handle promises and thus we return a promise. toPromise() also makes your observable hot */
    .then(addresses => {
      const html = titleHelpers.renderHtml(addresses);
      res.status(200).send(html);
    })
    .catch(err => {
      next(err);
    });
}

exports.retrieve = retrieve;
