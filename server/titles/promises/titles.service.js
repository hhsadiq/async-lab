'use strict';
const rp = require('request-promise');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');

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
          helpers.updateTitles(addresses, err.options.uri,
            helpers.titleErrors['400']);
        });
    })
    .value();

  return Promise.all(promises)
    .then(() => helpers.renderHtml(addresses));
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;