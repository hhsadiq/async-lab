'use strict';
const rp = require('request-promise');
const normalizeUrl = require('normalize-url');
const _ = require('lodash');
const cheerio = require('cheerio');

let titleErrors = {
  '400': 'NO RESPONSE',
  '403': 'User does not have permission to perform this operation',
  '404': 'No title found'
};

// let mustHaveKeys = {
//   address: true
// };

/*
 * Function to retrieve the titles from addresses
 */
function retrieve(addresses) {
  addresses = normalize(addresses);
  let options = {
    uri: addresses[0].normalizedUri,
    transform: function (html) {
      return {
        $: cheerio.load(html),
        uri: this.uri
      };
    }
  };
  return rp(options).then((res) => {
    let title = res.$('title').text();
    updateTitle(addresses, res.uri, title);
    if (!title) {
      return Promise.reject({code: 404, msg: titleErrors['404']});
    }
    return title;
  })
    .catch(function (err) {
      updateTitle(addresses, err.options.uri, titleErrors['400']);
    });
}

/**
 * Find all addresses having given uri, and update their titles
 * @param addresses
 * @param uri
 * @param title
 */
function updateTitle(addresses, uri, title) {
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