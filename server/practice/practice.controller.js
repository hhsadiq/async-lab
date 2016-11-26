const practiceService = require('./practice.service');

/*
 * Controller function returns practice for provided addresses
 */
function temp(req, res, next) {
  return practiceService.temp()
    .toArray() /* returns Observable containing one emission with all values in an array */
    .toPromise() /* express knows how to handle promises and thus we return a promise. toPromise() also makes your observable hot */
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      next(err);
    });
}

exports.temp = temp;
