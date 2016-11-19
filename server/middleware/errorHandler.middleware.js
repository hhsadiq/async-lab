'use strict';

let CommonError = require('../common/commonErrors');

//eslint-disable-next-line
function apiErrorHandler(err, req, res, next) {
  if (err.inner && err.inner.name === 'JsonWebTokenError'
    || err.code === 'credentials_required' || err.code === 'invalid_token'
    || err.code === 'credentials_bad_format') {
    err.code = err.status;
    err.msg = 'invalid_token';
  }
  console.error('err:' + err.code + 'message: ' + err.msg);
  res.status(err.code || err.status)
     .json(new CommonError(err.code, err.msg));
}

module.exports = apiErrorHandler;
