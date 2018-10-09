import { extname, dirname } from 'path';
import { readFileSync } from 'fs';
import { parse } from '@babel/parser';
import { declare } from '@babel/helper-plugin-utils';
import resolve from 'resolve';

import optimize from './optimize';
import escapeBraces from './escapeBraces';
import transformSvg from './transformSvg';
import fileExistsWithCaseSync from './fileExistsWithCaseSync';

let ignoreRegex;

export default declare(({
  assertVersion,
  template,
  traverse,
  types: t,
}) => {
  assertVersion(7);

  const buildSvg = template(`
  var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
`);

  const buildSvgWithDefaults = template(`
  var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
  SVG_NAME.defaultProps = SVG_DEFAULT_PROPS_CODE;
`);

  function applyPlugin(importIdentifier, importPath, path, state) {
    if (typeof importPath !== 'string') {
      throw new TypeError('`applyPlugin` `importPath` must be a string');
    }
    const { ignorePattern, caseSensitive } = state.opts;
    const { file } = state;
    if (ignorePattern) {
      // Only set the ignoreRegex once:
      ignoreRegex = ignoreRegex || new RegExp(ignorePattern);
      // Test if we should ignore this:
      if (ignoreRegex.test(importPath)) {
        return;
      }
    }
    // This plugin only applies for SVGs:
    if (extname(importPath) === '.svg') {
      const iconPath = state.file.opts.filename;
      const svgPath = resolve.sync(importPath, { basedir: dirname(iconPath) });
      if (caseSensitive && !fileExistsWithCaseSync(svgPath)) {
        throw new Error(`File path didn't match case of file on disk: ${svgPath}`);
      }
      if (!svgPath) {
        throw new Error(`File path does not exist: ${importPath}`);
      }
      const rawSource = readFileSync(svgPath, 'utf8');
      const optimizedSource = state.opts.svgo === false
        ? rawSource
        : optimize(rawSource, state.opts.svgo);

      const escapeSvgSource = escapeBraces(optimizedSource);

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
            defaultProps.push(t.objectProperty(t.identifier(prop.name.name), prop.value));
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
      file.get('ensureReact')();
      file.set('ensureReact', () => {});
    }
  }

  return {
    visitor: {
      Program: {
        enter({ scope, node }, { file }) {
          if (!scope.hasBinding('React')) {
            const reactImportDeclaration = t.importDeclaration([
              t.importDefaultSpecifier(t.identifier('React')),
            ], t.stringLiteral('react'));

            file.set('ensureReact', () => { node.body.unshift(reactImportDeclaration); });
          } else {
            file.set('ensureReact', () => {});
          }
        },
      },
      CallExpression(path, state) {
        const { node } = path;
        const requireArg = node.arguments.length > 0 ? node.arguments[0] : null;
        const filePath = t.isStringLiteral(requireArg) ? requireArg.value : null;
        if (node.callee.name === 'require' && t.isVariableDeclarator(path.parent) && filePath) {
          applyPlugin(path.parent.id, filePath, path.parentPath.parentPath, state);
        }
      },
      ImportDeclaration(path, state) {
        const { node } = path;
        if (node.specifiers.length > 0) {
          applyPlugin(node.specifiers[0].local, node.source.value, path, state);
        }
      },
    },
  };
});
