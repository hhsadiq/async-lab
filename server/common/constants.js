'use strict';

module.exports = {
  params: {
    titles: {
      retrieve: {
        query: {
          required: 'address',
          errors: {
            required: {
              code: 400,
              msg: 'Missing query param address'
            },
            invalid: {
              code: 400,
              msg: 'Invalid query param(s) found'
            }
          }
        }
      }
    }
  }
};
