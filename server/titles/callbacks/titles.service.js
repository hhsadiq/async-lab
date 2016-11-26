const request = require('request');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');

/*
 * Retrieve the titles from addresses using promises
 */
function retrieve(addresses, callback) {
  addresses = helpers.normalize(addresses);
  let callbackCount = 0;
  const uniqAddresses = _.uniqBy(addresses, 'normalizedUri');
  uniqAddresses.forEach((address, i, arr) => {
    request(address.normalizedUri, function (err, res, body) {
      callbackCount += 1;
      if (err) {
        console.error(err.msg || err.message);
        helpers.updateTitles(this.all, this.current.normalizedUri,
          helpers.titleErrors['400']);
      }
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body);
        const title = $('title').text();
        helpers.updateTitles(this.all, this.current.normalizedUri, title);
      }
      if (callbackCount === arr.length) {
        callback(null, helpers.renderHtml(addresses));
      }
    }.bind({ current: address, all: addresses }));
  });
}

/* ***************************** Module Exports ******************************* */
exports.retrieve = retrieve;
