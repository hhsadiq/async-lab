'use strict';
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
  _(addresses)
    .uniqBy('normalizedUri')
    .map((address, i, arr) => {
      request(address.normalizedUri, function (err, res, body) {
        callbackCount++;
        if (err) {
          console.error(err.msg || err.message);
          helpers.updateTitles(this.all, this.current.normalizedUri,
            helpers.titleErrors['400']);
        }
        if (!err && res.statusCode == 200) {
          let $ = cheerio.load(body);
          let title = $('title').text();
          helpers.updateTitles(this.all, this.current.normalizedUri, title);
        }
        if (callbackCount === arr.length) {
          callback(null, helpers.renderHtml(addresses));
        }
      }.bind({current: address, all: addresses}));
      return address;
    })
    .value();
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;