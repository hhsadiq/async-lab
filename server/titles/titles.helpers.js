'use strict';
const _ = require('lodash');
const constants = require('../common/constants');
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

let titleErrors = {
  '400': 'NO RESPONSE',
  '403': 'User does not have permission to perform this operation',
  '404': 'No title found'
};
module.exports.titleErrors = titleErrors;

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
module.exports.updateTitles = updateTitles;

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
module.exports.normalize = normalize;

/**
 * Render html and insert li tags for titles
 * @param addresses
 * @returns {*}
 */
function renderHtml(addresses) {
  let html = constants.response.html;
  let $ = cheerio.load(html);
  addresses.forEach(address => $('ul')
    .append(`<li>${address.originalUri} - "${address.title}"</li>`));
  return $.html();
}
module.exports.renderHtml = renderHtml;
