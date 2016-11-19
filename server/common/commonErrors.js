'use strict';

class CommonErrors {
  constructor(errorCode, overideMessage) {
    Object.assign(this, {
      400: 'Request was not understood.',
      401: 'Unauthorized request',
      403: 'Request was forbidden',
      404: 'Could not find resource',
      409: 'Resource is already taken',
      412: 'Failed Validation',
      500: 'An error occured. Unable to fulfil request',
      501: 'Not Implemented',
      default: 'An unknown error occurred'
    });
    return {
      error: errorCode,
      message: overideMessage ?
        overideMessage : this[errorCode] ?
        this[errorCode] : this.default
    };
  }
}

module.exports = CommonErrors;