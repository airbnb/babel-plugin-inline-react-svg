// validates svgo opts
// to contain minimal set of plugins that will strip some stuff
// for the babylon JSX parser to work
import Svgo from 'svgo';
import isPlainObject from 'lodash.isplainobject';
import sync from 'promise-synchronizer';

const essentialPlugins = ['removeDoctype', 'removeComments'];

function isEssentialPlugin(p) {
  return essentialPlugins.indexOf(p) !== -1;
}

function validateAndFix(opts) {
  if (!isPlainObject(opts)) return;

  if (opts.full) {
    if (
      typeof opts.plugins === 'undefined' ||
      (Array.isArray(opts.plugins) && opts.plugins.length === 0)
    ) {
      /* eslint no-param-reassign: 1 */
      opts.plugins = [...essentialPlugins];
      return;
    }
  }

  // opts.full is false, plugins can be empty
  if (typeof opts.plugins === 'undefined') return;
  if (Array.isArray(opts.plugins) && opts.plugins.length === 0) return;

  // track whether its defined in opts.plugins
  const state = essentialPlugins.reduce((p, c) => Object.assign(p, { [c]: false }), {});

  opts.plugins.forEach((p) => {
    if (typeof p === 'string' && isEssentialPlugin(p)) {
      state[p] = true;
    } else if (typeof p === 'object') {
      Object.keys(p).forEach((k) => {
        if (isEssentialPlugin(k)) {
          // make it essential
          if (!p[k]) p[k] = true;
          // and update state
          /* eslint no-param-reassign: 1 */
          state[k] = true;
        }
      });
    }
  });

  Object.keys(state)
    .filter(key => !state[key])
    .forEach(key => opts.plugins.push(key));
}

export default function optimize(content, opts = {}) {
  validateAndFix(opts);
  const svgo = new Svgo(opts);

  // Svgo isn't _really_ async, it however is async enough to require some handling:
  let returnValue;
  try {
    sync(svgo.optimize(content)
      .then((response) => {
        if (response.error) {
          throw response.error;
        } else {
          returnValue = response.data;
        }
      })
    );
  } catch (error) {
    returnValue = error;
  }

  return returnValue;
}
