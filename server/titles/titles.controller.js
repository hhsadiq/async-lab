'use strict';

let commonResponse = require('../common/commonResponse');
let titlesService = require('./titles.service');

/*
 * Controller function returns titles for provided addresses
 */
function retrieve(req, res, next) {
  titlesService.retrieve(req.params.id, req.user.client.id)
  .then((titles) => {
    res.status(200).json(new commonResponse().addData('titles', titles.toJSON()).object);
  })
  .catch((error) => {
    next(error);
  });
}

exports.retrieve = retrieve;