module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "func-names": ["error", "never"],
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
    ],
    "no-console": [
      "error", {
        allow: [
          "warn",
          "info",
          "error"]
      }
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