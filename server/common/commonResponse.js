const _ = require('lodash');

class CommonResponse {
  constructor() {
    Object.assign(this, {
      privateObject: {
        success: true,
        message: '',
      },
    });
    return this;
  }

  get object() {
    return this.privateObject;
  }

  addMsg(message) {
    this.privateObject.message = message;
    return this;
  }

  addData(key, data) {
    this.privateObject[key] = data;
    return this;
  }

  addDataWithKeys(data) {
    _.each(data, (value, key) => {
      this.privateObject[key] = value;
    });
    return this;
  }
}

module.exports = CommonResponse;
