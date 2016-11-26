/*
 * BaseController will load all the controllers and API routes defined within them
 */
const express = require('express');

const router = express.Router();

router.use('/I/want/title', require('../titles/titles.routes'));

router.use('/practice', require('../practice/practice.routes'));

// generic catch others, not implemented
router.get('/*', (req, res) => res.status(404).send('URL not found'));

module.exports = router;
