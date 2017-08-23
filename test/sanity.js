import { transformFile } from 'babel-core';

transformFile('test/fixtures/test.jsx', {
  presets: ['airbnb'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  console.log(result.code);
});

transformFile('test/fixtures/test-case-sensitive.jsx', {
  presets: ['airbnb'],
  plugins: [
    ['../../src/index',
    {
        "caseSensitive": true
    }]
  ],
}, (err, result) => {
  if (err && err.message.indexOf('match case') !== -1) {
    console.log("Test passed: Expected case sensitive error was thrown");
  } else {
    throw new Error("Test failed: Expected case sensitive error wasn't thrown");
  }
});