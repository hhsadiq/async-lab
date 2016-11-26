'use strict';
const request = require('request');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const Rx = require('rxjs/Rx');


/*
 * Retrieve the titles from addresses using rxjs
 */
function retrieve(addresses) {
  // Rx is lazy, better to do all executing code in the rx stream
  // Note; why not use the uniqBy in the normalize helper?)
  // Its best not to subscribe() in your function which creates the rx stream but let the callee
  // be responsible for the lifecycle of the Rx stream.
  const normalized = helpers.normalize(addresses);
  return Rx.Observable
    .from(normalized)
    .distinct(address => address.normalizedUri)
    .mergeMap(
      (address) => {
        return Rx.Observable.bindNodeCallback(request)(address.normalizedUri)
          .map(res => {
            // no `let` needed, not mutating the vars after initial assignment
            const $ = cheerio.load(res[1]);
            return $('title').text();
          })
          .catch((err) => {
            console.error(err.msg || err.message);
            //if something fails in your request OR mapping of res we end up here
            return Rx.Observable.of(helpers.titleErrors['400']);
          });
      },
      (address, title) => (
        // no modification of global state (array), just emit the
        // data objects as they become available
        helpers.groupSimilarAddresses(normalized, address, title)
      ))
    // flatten the group
    .mergeMap(group => group);
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
