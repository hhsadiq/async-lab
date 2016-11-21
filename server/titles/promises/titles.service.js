'use strict';
const rp = require('request-promise');
const Promise = require('bluebird');
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
function retrieve(addresses) {
  addresses = helpers.normalize(addresses);
  let promises = _(addresses)
    .uniqBy('normalizedUri')
    .map((address) => {
      let options = {
        uri: address.normalizedUri,
        transform: function (html) {
          return {
            $: cheerio.load(html),
            uri: this.uri
          };
        }
      };
      return rp(options)
        .then((res) => {
          let title = res.$('title').text();
          helpers.updateTitles(addresses, res.uri, title);
          return title;
        })
        .catch(function (err) {
          console.error(err.msg || err.message);
          helpers.updateTitles(addresses, err.options.uri, titleErrors['400']);
        });
    })
    .value();

  return Promise.all(promises)
    .then(() => helpers.renderHtml(addresses));
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
exports.titleErrors = titleErrors;