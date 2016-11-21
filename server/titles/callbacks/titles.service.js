'use strict';
const request = require('request');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');

let titleErrors = {
  '400': 'NO RESPONSE',
  '403': 'User does not have permission to perform this operation',
  '404': 'No title found'
};

/*
 * Retrieve the titles from addresses using promises
 */
function retrieve(addresses, callback) {
  addresses = helpers.normalize(addresses);
  let callbackCount = 0;
  _(addresses)
    .uniqBy('normalizedUri')
    .map((address, i, arr) => {
      request(address.normalizedUri, (err, res, body) => {
        callbackCount++;
        if (err) {
          console.error(err.msg || err.message);
          helpers.updateTitles(addresses, res.request.href, titleErrors['400']);
        }
        if (!err && res.statusCode == 200) {
          let $ = cheerio.load(body);
          let title = $('title').text();
          helpers.updateTitles(addresses, res.request.href, title);
        }
        if (callbackCount === arr.length) {
          callback(null, helpers.renderHtml(addresses));
        }
      });
    })
    .value();
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
exports.titleErrors = titleErrors;