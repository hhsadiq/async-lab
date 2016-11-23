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
  addresses = helpers.normalize(addresses);
  let html = new Rx.Subject();
  Rx.Observable
    .from(_.uniqBy(addresses, 'normalizedUri'))
    .mergeMap(
      (address) => {
        return Rx.Observable.bindNodeCallback(request)(address.normalizedUri)
        .catch(err => {
          console.error(err.msg || err.message);
          helpers.updateTitles(addresses, normalizeUrl(err.host),
            helpers.titleErrors['400']);
          return Rx.Observable.empty();
        })},
      (address, res) => ({address: address, res: res}))
    .subscribe(
      (result) => {
        let $ = cheerio.load(result.res[1]);
        let title = $('title').text();
        helpers.updateTitles(addresses, result.address.normalizedUri, title);
      },
      err => html.error(err),
      () => html.next(helpers.renderHtml(addresses)));

  return html;
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;