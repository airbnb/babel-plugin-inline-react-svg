import { extname, dirname } from 'path';
import { readFileSync } from 'fs';
import template from 'babel-template';
import traverse from 'babel-traverse';
import { parse } from 'babylon';
import resolveFrom from 'resolve-from';
import optimize from './optimize';
import escapeBraces from './escapeBraces';
import transformSvg from './transformSvg';

const buildSvg = template(`
  var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
`);

const buildSvgWithDefaults = template(`
  var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
  SVG_NAME.defaultProps = SVG_DEFAULT_PROPS_CODE;
`);

let ignoreRegex;

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
        const iconPath = state.file.opts.filename;
        const svgPath = resolveFrom(dirname(iconPath), path.node.source.value);
        const svgSource = readFileSync(svgPath, 'utf8');
        const optimizedSvgSource = optimize(svgSource, state.opts.svgo);
        const escapeSvgSource = escapeBraces(optimizedSvgSource);

        const parsedSvgAst = parse(escapeSvgSource, {
          sourceType: 'module',
          plugins: ['jsx'],
        });

        traverse(parsedSvgAst, transformSvg(t));

        const svgCode = traverse.removeProperties(parsedSvgAst.program.body[0].expression);

        const opts = {
          SVG_NAME: importIdentifier,
          SVG_CODE: svgCode,
        };

        // Move props off of element and into defaultProps
        if (svgCode.openingElement.attributes.length > 1) {
          const keepProps = [];
          const defaultProps = [];

          svgCode.openingElement.attributes.forEach((prop) => {
            if (prop.type === 'JSXSpreadAttribute') {
              keepProps.push(prop);
            } else {
              defaultProps.push(
                t.objectProperty(
                  t.identifier(prop.name.name),
                  prop.value,
                )
              );
            }
          });

          svgCode.openingElement.attributes = keepProps;
          opts.SVG_DEFAULT_PROPS_CODE = t.objectExpression(defaultProps);
        }

        if (opts.SVG_DEFAULT_PROPS_CODE) {
          const svgReplacement = buildSvgWithDefaults(opts);
          path.replaceWithMultiple(svgReplacement);
        } else {
          const svgReplacement = buildSvg(opts);
          path.replaceWith(svgReplacement);
        }
      }
    },
  },
});
