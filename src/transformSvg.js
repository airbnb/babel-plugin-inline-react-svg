/* eslint-disable no-param-reassign */
//
// These visitors normalize the SVG into something React understands:
//

import { namespaceToCamel, hyphenToCamel } from './camelize';
import cssToObj from './cssToObj';

export default t => ({
  JSXAttribute(path) {
    if (t.isJSXNamespacedName(path.node.name)) {
      // converts
      // <svg xmlns:xlink="asdf">
      // to
      // <svg xmlnsXlink="asdf">
      path.node.name = t.jSXIdentifier(
        namespaceToCamel(path.node.name.namespace.name, path.node.name.name.name)
      );
    } else if (t.isJSXIdentifier(path.node.name)) {
      // converts
      // <tag class="blah blah1"/>
      // to
      // <tag className="blah blah1"/>
      if (path.node.name.name === 'class') {
        path.node.name.name = 'className';
      }

      // converts
      // <tag style="text-align: center; width: 50px">
      // to
      // <tag style={{textAlign: 'center', width: '50px'}}>
      if (path.node.name.name === 'style') {
        const csso = cssToObj(path.node.value.value);
        const properties = Object.keys(csso).map(prop => t.objectProperty(
          t.identifier(hyphenToCamel(prop)),
          t.stringLiteral(csso[prop])
        ));
        path.node.value = t.jSXExpressionContainer(
          t.objectExpression(properties)
        );
      }

      // converts
      // <svg stroke-width="5">
      // to
      // <svg strokeWidth="5">
      // don't convert any custom data-* attributes
      if (!path.node.name.name.startsWith('data-')) {
        path.node.name.name = hyphenToCamel(path.node.name.name);
      }
    }
  },

  // converts
  // <svg>
  // to
  // <svg {...props}>
  // after passing through attributes visitors
  JSXOpeningElement(path) {
    if (path.node.name.name.toLowerCase() === 'svg') {
      // add spread props
      path.node.attributes.push(
        t.jSXSpreadAttribute(
          t.identifier('props')
        )
      );
    }
  },
});
