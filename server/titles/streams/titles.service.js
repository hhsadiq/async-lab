'use strict';
const request = require('request');
const cheerio = require('cheerio');
const helpers = require('../titles.helpers');
const _ = require('lodash');
const Rx = require('rxjs/Rx');


/*
 * Retrieve the titles from addresses using promises
 */
function retrieve(addresses, callback) {
  addresses = helpers.normalize(addresses);
  let uniqAddresses = _.uniqBy(addresses, 'normalizedUri');
  let observable = Rx.Observable.bindNodeCallback(request);
  let ad = 'googlecom';
  let result = observable(ad);
  result.subscribe((res) => {
    let $ = cheerio.load(res[1]);
    let title = $('title').text();
    helpers.updateTitles(addresses, res[0].request.uri, title);
  }, (err) => {
    console.error(err.msg || err.message);
    helpers.updateTitles(addresses, uniqAddresses[0].normalizedUri,
      helpers.titleErrors['400']);
  });
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;