const express = require('express');
const constants = require('../common/constants');
const titlesController = require('./promises/titles.controller');
const CommonError = require('../common/commonErrors');

const router = express.Router();

/**
 * @api {get} /I/want/title/ Get an html file containing list of titles
 * of websites addresses passed in query string
 * @apiGroup Title
 * @apiName Get Titles (Title)
 * @apiDescription This API takes the query Param and returns an html file or an error object
 *
 * @apiParam {String} address Website address

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
router.get('/',
  (req, res, next) => {
    const validation = constants.params.titles.retrieve.query;
    if (!req.query[validation.required]) {
      next(new CommonError(validation.errors.required.code,
        validation.errors.required.msg));
    }
    if (Object.keys(req.query).length > 1) {
      next(new CommonError(validation.errors.invalid.code,
        validation.errors.invalid.msg));
    }
    next();
  },
  titlesController.retrieve);

module.exports = router;
