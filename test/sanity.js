import { transformFile } from 'babel-core';

transformFile('test/fixtures/test.jsx', {
  babelrc: false,
  presets: ['react'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test.jsx', result.code);
});

transformFile('test/fixtures/test-case-sensitive.jsx', {
  babelrc: false,
  presets: ['react'],
  plugins: [
    ['../../src/index', {
      caseSensitive: true,
    }],
  ],
}, (err) => {
  if (err && err.message.indexOf('match case') !== -1) {
    console.log('test/fixtures/test-case-sensitive.jsx', 'Test passed: Expected case sensitive error was thrown');
  } else {
    throw new Error("Test failed: Expected case sensitive error wasn't thrown");
  }
});
