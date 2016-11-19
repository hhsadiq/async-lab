'use strict';


let titleErrors = {
  '400': 'Bad request. Parameters either missing or incorrect',
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
  return new Promise().then((titles) => {
    if (!titles) {
      return Promise.reject({code: 404, msg: titleErrors['404']});
    }
    return titles;
  })
  .catch(errorHandler);
}

function errorHandler(err) {
  if ('Validation error' === err.message) {
    let messages = err.errors.map((e) => {
      return e.message;
    });
    return Promise.reject({
      code: 400,
      msg: messages.join()
    });
  }
  return Promise.reject({code: (err.code || 500), msg: (err.msg || err.message)});
}

/****************************** Module Exports ******************************* */
exports.retrieve = retrieve;
exports.titleErrors = titleErrors;