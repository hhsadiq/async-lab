'use strict';

let _ = require('lodash');

class CommonResponse {
  constructor() {
    Object.assign(this, {
      _object: {
        success: true,
        message: ''
      }
    });
    return this;
  }

  get object() {
    return this._object;
  }

  addMsg(message) {
    this._object.message = message;
    return this;
  }

  addData(key, data) {
    this._object[key] = data;
    return this;
  }

  addDataWithKeys(data) {
    _.each(data, (value, key) => {
      this._object[key] = value;
    });
    return this;
  }
}

module.exports = CommonResponse;