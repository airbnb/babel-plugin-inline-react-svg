import { extname, dirname, parse as parseFilename, resolve as resolvePath } from 'path';
import { readFileSync, existsSync } from 'fs';
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

  const buildSvg = ({
    IS_EXPORT,
    EXPORT_FILENAME,
    SVG_NAME,
    SVG_CODE,
    SVG_DEFAULT_PROPS_CODE,
  }) => {
    const namedTemplate = `
      var SVG_NAME = function SVG_NAME(props) { return SVG_CODE; };
      ${SVG_DEFAULT_PROPS_CODE ? 'SVG_NAME.defaultProps = SVG_DEFAULT_PROPS_CODE;' : ''}
      ${IS_EXPORT ? 'export { SVG_NAME };' : ''}
    `;
    const anonymousTemplate = `
      var Component = function (props) { return SVG_CODE; };
      ${SVG_DEFAULT_PROPS_CODE ? 'Component.defaultProps = SVG_DEFAULT_PROPS_CODE;' : ''}
      Component.displayName = 'EXPORT_FILENAME';
      export default Component;
    `;

    if (SVG_NAME !== 'default') {
      return template(namedTemplate)({ SVG_NAME, SVG_CODE, SVG_DEFAULT_PROPS_CODE });
    }
    return template(anonymousTemplate)({ SVG_CODE, SVG_DEFAULT_PROPS_CODE, EXPORT_FILENAME });
  };

  function applyPlugin(importIdentifier, importPath, path, state, isExport, exportFilename) {
    if (typeof importPath !== 'string') {
      throw new TypeError('`applyPlugin` `importPath` must be a string');
    }
    const { ignorePattern, caseSensitive, filename: providedFilename, root, alias } = state.opts;
    const { file, filename } = state;
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
      const iconPath = filename || providedFilename;
      const aliasPart = importPath.split('/')[0];
      const aliasMatch = alias[aliasPart];
      const svgPaths = [];
      let chosenPath;

      if (aliasMatch) {
        const resolveRoot = resolvePath(process.cwd(), root || './');
        const aliasMatches = typeof aliasMatch === 'string' ? [aliasMatch] : aliasMatch;

        aliasMatches.forEach((match) => {
          const aliasedPath = resolvePath(resolveRoot, match);
          svgPaths.push(resolvePath(aliasedPath, importPath.replace(`${aliasPart}/`, '')));
        });
      } else {
        svgPaths.push(resolve.sync(importPath, { basedir: dirname(iconPath) }));
      }

      for (let i = 0; i < svgPaths.length; i += 1) {
        const svgPath = svgPaths[i];
        if (caseSensitive && !fileExistsWithCaseSync(svgPath)) {
          throw new Error(`File path didn't match case of file on disk: ${svgPath}`);
        }

        if (svgPath && existsSync(svgPath)) {
          chosenPath = svgPath;
          break;
        }
      }

      if (!chosenPath) {
        throw new Error(`File path does not exist: ${importPath}`);
      }

      const rawSource = readFileSync(chosenPath, 'utf8');
      const optimizedSource = state.opts.svgo === false
        ? { data: rawSource }
        : optimize(rawSource, state.opts.svgo);

      const escapeSvgSource = escapeBraces(optimizedSource);

      const parsedSvgAst = parse(escapeSvgSource.data, {
        sourceType: 'module',
        plugins: ['jsx'],
      });

      traverse(parsedSvgAst, transformSvg(t));

      const svgCode = traverse.removeProperties(parsedSvgAst.program.body[0].expression);

      const opts = {
        SVG_NAME: importIdentifier,
        SVG_CODE: svgCode,
        IS_EXPORT: isExport,
        EXPORT_FILENAME: exportFilename,
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
        const svgReplacement = buildSvg(opts);
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
        enter(path, { file, opts, filename }) {
          if (typeof filename === 'string' && typeof opts.filename !== 'undefined') {
            throw new TypeError('the "filename" option may only be provided when transforming code');
          }
          if (typeof filename === 'undefined' && typeof opts.filename !== 'string') {
            throw new TypeError('the "filename" option is required when transforming code');
          }
          if (!path.scope.hasBinding('React')) {
            const reactImportDeclaration = t.importDeclaration([
              t.importDefaultSpecifier(t.identifier('React')),
            ], t.stringLiteral('react'));

            file.set('ensureReact', () => {
              const [newPath] = path.unshiftContainer('body', reactImportDeclaration);
              newPath.get('specifiers').forEach((specifier) => { path.scope.registerBinding('module', specifier); });
            });
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
      ExportNamedDeclaration(path, state) {
        const { node } = path;
        if (node.specifiers.length > 0 && node.specifiers[0].local && node.specifiers[0].local.name === 'default') {
          const exportName = node.specifiers[0].exported.name;
          const filename = parseFilename(node.source.value).name;
          applyPlugin(exportName, node.source.value, path, state, true, filename);
        }
      },
    },
  };
});
