'use strict';
const rp = require('request-promise');
const normalizeUrl = require('normalize-url');
const _ = require('lodash');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const constants = require('../common/constants');

let titleErrors = {
  '400': 'NO RESPONSE',
  '403': 'User does not have permission to perform this operation',
  '404': 'No title found'
};

/*
 * Function to retrieve the titles from addresses
 */
function retrieve(addresses) {
  addresses = normalize(addresses);
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
          updateTitles(addresses, res.uri, title);
          return title;
        })
        .catch(function (err) {
          console.error(err.msg || err.message);
          updateTitles(addresses, err.options.uri, titleErrors['400']);
        });
    })
    .value();

  return Promise.all(promises)
    .then(() => {
      let html = constants.response.html;
      let $ = cheerio.load(html);
      addresses.forEach(address => $('ul')
        .append(`<li>${address.originalUri} - "${address.title}"</li>`));
      return $.html();
    });
}

/**
 * Find all addresses having given uri, and update their titles
 * @param addresses
 * @param uri
 * @param title
 */
function updateTitles(addresses, uri, title) {
  addresses.filter(address => address.normalizedUri === uri)
    .forEach(address => address.title = title);
}
/**
 * Return an array of original and normalized urls
 * @param addresses
 * @returns {Array}
 */
function normalize(addresses) {
  return (_.isArray(addresses) ? addresses : [addresses])
    .map(address => {
      return {
        originalUri: address,
        normalizedUri: normalizeUrl(address)
      };
    });
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
exports.titleErrors = titleErrors;