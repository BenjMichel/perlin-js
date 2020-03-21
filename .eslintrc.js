module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    test: 'true',
    expect: 'true'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  }
}
