'use strict';
const request = require('request');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');
const normalizeUrl = require('normalize-url');
const Rx = require('rxjs/Rx');


/*
 * Retrieve the titles from addresses using rxjs
 */
function retrieve(addresses) {
  // Rx is lazy, better to do all executing code in the rx stream
  // Note; why not use the uniqBy in the normalize helper?)
  // Its best not to subscribe() in your function which creates the rx stream but let the callee
  // be responsible for the lifecycle of the Rx stream. 
  return Rx.Observable
    .from(_.uniqBy(helpers.normalize(addresses), 'normalizedUri'))
    .mergeMap(
      (address) => {
        return Rx.Observable.bindNodeCallback(request)(address.normalizedUri)
          .map(res => {
            // no `let` needed, not mutating the vars after initial assignment
            const $ = cheerio.load(res[1]);
            const title = $('title').text();
          })
          .catch(err => {
            //if something fails in your request OR mapping of res we end up here
            return Rx.Observable.just(helpers.titleErrors['400']);
          });
      },
      (address, title) => {
        // no modification of global state (array), just emit the data objects as they become available
        return {
          normalizedUri: address.normalizedUri,
          title: title
        };
      });
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
