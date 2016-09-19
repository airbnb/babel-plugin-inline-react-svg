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
