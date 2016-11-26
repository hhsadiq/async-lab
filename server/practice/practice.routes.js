'use strict';

const express = require('express');
const router = express.Router();
const practiceController = require('./practice.controller');

/**
 * @api {get} /practice/ A practice route to run Rxjs examples and poke around
 * @apiGroup Practice
 * @apiName Get Practice results (Practice)
 * @apiDescription This endpoint is just to practice and run different examples and temp ideas
 *
 * @apiParam {String} address Website address

 * @apiSuccess {Object} Practice temp Object
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
router.get('/', practiceController.temp);

module.exports = router;
