const practiceService = require('./practice.service');

/*
 * Controller function returns practice for provided addresses
 */
function temp(req, res, next) {
  return practiceService.temp()
    /* returns Observable containing one emission with all values in an array */
    .toArray()
    .toPromise()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
}

exports.temp = temp;
