import { transformFile } from 'babel-core';
import fs from 'fs';
import path from 'path';

function assertReactImport(result) {
  const match = result.code.match(/import React from 'react'/g);
  if (!match) {
    throw new Error('no React import found');
  }
  if (match.length !== 1) {
    throw new Error(`more or less than one match found: ${match}\n${result.code}`);
  }
}

function validateDefaultProps(result) {
  if (!(/'data-name':/g).test(result.code)) {
    throw new Error('data-* props need to be quoted');
  }
}

transformFile('test/fixtures/test-import.jsx', {
  babelrc: false,
  presets: ['react'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  assertReactImport(result);
  validateDefaultProps(result);
  console.log('test/fixtures/test-import.jsx', result.code);
});

transformFile('test/fixtures/test-multiple-svg.jsx', {
  babelrc: false,
  presets: ['react'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  assertReactImport(result);
  validateDefaultProps(result);
  console.log('test/fixtures/test-multiple-svg.jsx', result.code);
});

transformFile('test/fixtures/test-no-react.jsx', {
  babelrc: false,
  presets: ['react'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-no-react.jsx', result.code);
  assertReactImport(result);
  validateDefaultProps(result);
});

if (fs.existsSync(path.resolve('./PACKAGE.JSON'))) {
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
} else {
  console.log('# SKIP: case-sensitive check; on a case-sensitive filesystem');
}

transformFile('test/fixtures/test-no-svg-or-react.js', {
  babelrc: false,
  presets: [],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-no-svg-or-react.js', result.code);
  if (/React/.test(result.code)) {
    throw new Error('Test failed: React import was present');
  }
});

transformFile('test/fixtures/test-import.jsx', {
  presets: ['airbnb'],
  plugins: [
    '../../src/index',
  ],
}, (err1, importResult) => {
  if (err1) throw err1;
  console.log('test/fixtures/test-import.jsx', importResult.code);
  transformFile('test/fixtures/test-require.jsx', {
    presets: ['airbnb'],
    plugins: [
      '../../src/index',
    ],
  }, (err2, requireResult) => {
    if (err2) throw err2;
    if (importResult.code !== requireResult.code) {
      throw new Error('Test failed: Import and require tests don\'t match');
    }
  });
});

transformFile('test/fixtures/test-dynamic-require.jsx', {
  presets: ['airbnb'],
  plugins: [
    '../../src/index',
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-dynamic-require.jsx', result.code);
});
