import { extname, dirname, join } from 'path';
import { readFileSync } from 'fs';
import template from 'babel-template';
import traverse from 'babel-traverse';
import { parse } from 'babylon';
import optimize from './optimize';
import transformSvg from './transformSvg';

const buildSvg = template(`
  var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
`);

let ignoreRegex;

const readImportSync = (path, state) => {
  const iconPath = state.file.opts.filename;
  const importText = path.node.source.value;

  try {
    const svgPath = join(dirname(iconPath), importText);
    return readFileSync(svgPath, 'utf8');
  } catch (e) {
    const svgPath = require.resolve(importText);
    return readFileSync(svgPath, 'utf8');
  }
};

export default ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path, state) {
      const { ignorePattern } = state.opts;
      if (ignorePattern) {
        // Only set the ignoreRegex once:
        ignoreRegex = ignoreRegex || new RegExp(ignorePattern);
        // Test if we should ignore this:
        if (ignoreRegex.test(path.node.source.value)) {
          return;
        }
      }
      // This plugin only applies for SVGs:
      if (extname(path.node.source.value) === '.svg') {
        // We only support the import default specifier, so let's use that identifier:
        const importIdentifier = path.node.specifiers[0].local;
        const svgSource = readImportSync(path, state);
        const optimizedSvgSource = optimize(svgSource);

        const parsedSvgAst = parse(optimizedSvgSource, {
          sourceType: 'module',
          plugins: ['jsx'],
        });

        traverse(parsedSvgAst, transformSvg(t));

        const svgCode = traverse.removeProperties(parsedSvgAst.program.body[0].expression);

        const svgReplacement = buildSvg({
          SVG_NAME: importIdentifier,
          SVG_CODE: svgCode,
        });

        path.replaceWith(svgReplacement);
      }
    },
  },
});
