import { transformFile, transform } from '@babel/core';
import fs from 'fs';
import path from 'path';
import transformTs from '@babel/plugin-transform-typescript';
import inlineReactSvgPlugin from '../src';

function assertMatchImport(name, matchRegex) {
  return (result) => {
    const match = result.code.match(matchRegex());
    if (!match) {
      throw new Error(`no ${name} import found`);
    }
    if (match.length !== 1) {
      throw new Error(`more or less than one match found: ${match}\n${result.code}`);
    }
  };
}

const assertReactImport = assertMatchImport('React', () => /import React from ['"]react['"]/g);

const assertObjectAssignImport = assertMatchImport(
  'object.assign/polyfill',
  () => /import objectAssignPolyfill from ['"]object.assign\/polyfill['"]/g,
);

function assertDefaultProps(shouldExist, result) {
  const exists = (/\.defaultProps = /g).test(result.code);

  if (!exists && shouldExist) {
    throw new Error('defaultProps needs to be present');
  }

  if (exists && !shouldExist) {
    throw new Error('defaultProps shouldn\'t be present');
  }
}

function validateDefaultProps(result) {
  if (!(/'data-name':/g).test(result.code)) {
    throw new Error('data-* props need to be quoted');
  }
}

transformFile('test/fixtures/test-import.jsx', {
  babelrc: false,
  presets: ['@babel/preset-react'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  assertReactImport(result);
  assertObjectAssignImport(result);
  assertDefaultProps(false, result);
  validateDefaultProps(result);
  console.log('test/fixtures/test-import.jsx\n', result.code);
});

transformFile('test/fixtures/test-multiple-svg.jsx', {
  babelrc: false,
  presets: ['@babel/preset-react'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  assertReactImport(result);
  assertObjectAssignImport(result);
  assertDefaultProps(false, result);
  validateDefaultProps(result);
  console.log('test/fixtures/test-multiple-svg.jsx\n', result.code);
});

transformFile('test/fixtures/test-no-react.jsx', {
  babelrc: false,
  presets: ['@babel/preset-react'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-no-react.jsx\n', result.code);
  assertReactImport(result);
  assertObjectAssignImport(result);
  assertDefaultProps(false, result);
  validateDefaultProps(result);
});

transformFile('test/fixtures/test-no-duplicate-react.jsx', {
  babelrc: false,
  presets: ['@babel/preset-react'],
  plugins: [
    inlineReactSvgPlugin,
    ({
      visitor: {
        Program: {
          exit({ scope }) {
            if (!scope.hasBinding('React')) {
              throw new Error('React binding was expected.');
            }
          },
        },
      },
    }),
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-no-duplicate-react.jsx\n', result.code);
  assertReactImport(result);
  assertObjectAssignImport(result);
  assertDefaultProps(false, result);
  validateDefaultProps(result);
});

if (fs.existsSync(path.resolve('./PACKAGE.JSON'))) {
  transformFile('test/fixtures/test-case-sensitive.jsx', {
    babelrc: false,
    presets: ['@babel/preset-react'],
    plugins: [
      [inlineReactSvgPlugin, {
        caseSensitive: true,
      }],
    ],
  }, (err) => {
    if (err && err.message.indexOf('match case') !== -1) {
      console.log('test/fixtures/test-case-sensitive.jsx', 'Test passed: Expected case sensitive error was thrown');
    } else {
      throw new Error(`Test failed: Expected case sensitive error wasn‘t thrown, got: ${err.message}`);
    }
  });
} else {
  console.log('# SKIP: case-sensitive check; on a case-sensitive filesystem');
}

transformFile('test/fixtures/test-no-svg-or-react.js', {
  babelrc: false,
  presets: [],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-no-svg-or-react.js\n', result.code);
  if (/React/.test(result.code)) {
    throw new Error('Test failed: React import was present');
  }
});

transformFile('test/fixtures/test-import.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err1, importResult) => {
  if (err1) throw err1;
  console.log('test/fixtures/test-import.jsx', importResult.code);
  transformFile('test/fixtures/test-require.jsx', {
    presets: ['airbnb'],
    plugins: [
      inlineReactSvgPlugin,
    ],
  }, (err2, requireResult) => {
    if (err2) throw err2;
    if (importResult.code !== requireResult.code) {
      throw new Error('Test failed: Import and require tests don‘t match');
    }
  });
});

transformFile('test/fixtures/test-dynamic-require.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-dynamic-require.jsx\n', result.code);
});

const filename = 'test/fixtures/test-import-read-file.jsx';
transform(fs.readFileSync(filename), {
  presets: ['airbnb'],
  plugins: [
    [inlineReactSvgPlugin, { filename }],
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-import-read-file.jsx\n', result.code);
});

transformFile('test/fixtures/test-export-default.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-export-default.jsx\n', result.code);
});

transformFile('test/fixtures/test-export-default-as.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
    [transformTs, { isTSX: true }],
    () => ({
      pre() {
        console.warn = (msg) => { throw new Error(`Got console.warn: ${msg}`); };
      },
    }),
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-export-default-as.jsx\n', result.code);
});

transformFile('test/fixtures/test-export-all-as.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-export-all-as.jsx\n', result.code);
});

transformFile('test/fixtures/test-root-styled.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-root-styled.jsx\n', result.code);
});

transformFile('test/fixtures/test-commented.jsx', {
  presets: ['airbnb'],
  plugins: [
    inlineReactSvgPlugin,
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-commented.jsx\n', result.code);
});

transformFile('test/fixtures/test-props.jsx', {
  presets: ['airbnb'],
  plugins: [
    [inlineReactSvgPlugin, { emitDeprecatedDefaultProps: true }],
  ],
}, (err, result) => {
  if (err) throw err;
  assertDefaultProps(true, result);
  console.log('test/fixtures/test-props.jsx\n', result.code);
});

/* TODO: uncomment if babel fixes its parsing for SVGs
transformFile('test/fixtures/test-commented.jsx', {
  presets: ['airbnb'],
  plugins: [
    [inlineReactSvgPlugin, { svgo: false }],
  ],
}, (err, result) => {
  if (err) throw err;
  console.log('test/fixtures/test-commented.jsx', result.code);
});
*/
