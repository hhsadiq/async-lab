module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  globals: {
    "log4js": true,
    "describe": true,
    "context": true,
    "before": true,
    "beforeEach": true,
    "after": true,
    "afterEach": true,
    "it": true,
    "expect": true
  }
};