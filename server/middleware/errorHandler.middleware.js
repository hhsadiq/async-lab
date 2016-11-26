const CommonError = require('../common/commonErrors');

//eslint-disable-next-line
function apiErrorHandler(err, req, res, next) {
  console.error(`err:' ${err.code} message: ${err.msg}`);
  res.status(err.code || err.status || 500)
     .json(new CommonError(err.code, err.msg || err.message));
}

module.exports = apiErrorHandler;
