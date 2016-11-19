/*
 * BaseController will load all the controllers and API routes defined within them
 */

'use strict';
const express = require('express');
const router = express.Router();

router.use('I/want/title', require('../titles/titles.routes'));

//generic catch others, not implemented
router.get('*', function(req, res) {
  res.status(404).send('URL not found');
});

module.exports = router;
