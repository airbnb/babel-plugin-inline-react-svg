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

export default ({ types: t }) => ({
  visitor: {
    ImportDeclaration(path, state) {
      // This plugin only applies for SVGs:
      if (extname(path.node.source.value) === '.svg') {
        // We only support the import default specifier, so let's use that identifier:
        const importIdentifier = path.node.specifiers[0].local;
        const iconPath = state.file.opts.filename;
        const svgPath = join(dirname(iconPath), path.node.source.value);
        const svgSource = readFileSync(svgPath, 'utf8');
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
