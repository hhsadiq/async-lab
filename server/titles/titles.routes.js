'use strict';

const express = require('express');
let parameters = require('parameters-middleware');
let constants = require('../common/constants');
const router = express.Router();
let titlesController = require('./titles.controller');
let CommonError = require('../common/commonErrors');

/**
 * @api {get} /I/want/title/ Get an html file containing list of titles of websites addresses passed in query string
 * @apiGroup Title
 * @apiName Get Titles (Title)
 * @apiDescription This API takes the query Param and returns an html file or an error object
 *
 * @apiParam {String} address Webstie address

 * @apiSuccess {Object} Title title Object
 * @apiSuccess {Boolean} success Returns true for all 200 statuses.
 * @apiSuccess {String} message Business logic message.
 * @apiSuccessExample {json} Success-response :
 * {
 * "message": "Business logic message. Most likely empty",
 * "success": "boolean true"
 * }
 * @apiError (Error 404) NotFound
 * @apiError (Error 500) InternalError Somethings wrong!
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "error": "HTTP ERROR STATS CODE",
 *       "Message": "API Specific Error"
 *     }
 */
router.get('/:id',
  parameters(constants.routeParams.titles.retrieve, {
    message: function(missing) {
      return new CommonError(400, 'Missing Params ' + missing.join(', '));
    }
  }),
  titlesController.retrieve);

module.exports = router;
