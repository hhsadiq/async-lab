'use strict';
// const _ = require('lodash');
const Rx = require('rxjs/Rx');


/*
 * Retrieve the titles from addresses using rxjs
 */
function temp() {
  const numbers = Rx.Observable.of(1, 2, 3, 4, 5);
  const strings = Rx.Observable.of('a', 'b', 'c');
  return strings.combineLatest(numbers, (str, num) => str + num);
}

/****************************** Module Exports ******************************* */
exports.temp = temp;
