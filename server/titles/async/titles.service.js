const request = require('request');
const async = require('async');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');

/*
 * Retrieve the titles from addresses using promises
 */
function retrieve(addresses, callback) {
  addresses = helpers.normalize(addresses);
  const callbacks = _(addresses)
    .uniqBy('normalizedUri')
    .map(address =>
      (function (next) {
        request(address.normalizedUri, function (err, res, body) {
          if (err) {
            console.error(err.msg || err.message);
            helpers.updateTitles(this.all, this.current.normalizedUri,
              helpers.titleErrors['400']);
            next();
          }
          if (!err && res.statusCode === 200) {
            const $ = cheerio.load(body);
            const title = $('title').text();
            helpers.updateTitles(this.all, this.current.normalizedUri, title);
            next();
          }
        }.bind({ current: address, all: addresses }));
      }),
    )
    .value();
  async.waterfall(callbacks, () => {
    callback(null, helpers.renderHtml(addresses));
  });
}

/* ***************************** Module Exports ******************************* */
exports.retrieve = retrieve;
