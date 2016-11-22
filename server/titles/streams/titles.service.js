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
  let observable = Rx.Observable.bindNodeCallback(request);
  let html = new Rx.Subject();
  let streams = _(addresses)
    .uniqBy('normalizedUri')
    .map(address => observable(address.normalizedUri))
    .value();
  Rx.Observable
    .merge(...streams)
    .subscribe(
      (res) => {
        let $ = cheerio.load(res[1]);
        let title = $('title').text();
        helpers.updateTitles(addresses, normalizeUrl(res[0].request.href), title);
      }, (err) => {
        console.error(err.msg || err.message);
        helpers.updateTitles(addresses, normalizeUrl(err.host),
          helpers.titleErrors['400']);
      },
      () => {
        html.next(helpers.renderHtml(addresses));
      });
  return html;
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;