`redux-little-router` Experiments - Immutable/Tree Shaking Edition
==================================================================

## Getting started

```sh
$ yarn
$ yarn build
```

## Background

RLR issue https://github.com/FormidableLabs/redux-little-router/issues/261 notes that version `v14.3.0` which introduced `immutable` has the following problems:

- `immutable` fails on import (by design) and creates a build warning, which can fail some CIs.
- If a dev task includes `immutable`, then that gets **added** to the bundle.

This shouldn't be happening, at least not the second part, as tree-shaking should remove everything.

## Experiment

One webpack build, no babel, just a simple import in two forms:

```js
// one-off-import.js
import routerForBrowser from 'redux-little-router/es/environment/browser-router';

console.log("TODO HERE", routerForBrowser);
```

```js
// root-import.js
import { routerForBrowser } from 'redux-little-router';

console.log("TODO HERE", routerForBrowser);
```

These **should** be identical when run through a fully production webpack config. But they're **not**. Tree-shaking just **doesn't work** on `root-import.js` and it exhibits the bad behavior documented above. Looking to `yarn build` output below, `one-off-import.js` is a slim `115 kB` while `root-import.js` ends up with `354 kB` if `immutable` isn't anywhere installed and a whopping `499 kB` if it is!

`one-off-import.js` stays small and does the correct thing no matter what.

## Current Working Output

```
$ yarn build
yarn run v1.3.2
$ rm -rf dist && webpack
Hash: 3d1897e7834fe159292f09c72fd20dff8a133297
Version: webpack 3.10.0
Child
    Hash: 3d1897e7834fe159292f
    Time: 999ms
                Asset    Size  Chunks             Chunk Names
    one-off-import.js  115 kB       0  [emitted]  one-off-import
       [8] ./one-off-import.js 127 bytes {0} [built]
        + 32 hidden modules

    WARNING in one-off-import.js from UglifyJs
    Side effects in initialization of unused variable addLeadingSlash [one-off-import.js:128,4]
    [...SNIPPED...]


Child
    Hash: 09c72fd20dff8a133297
    Time: 1903ms
             Asset    Size  Chunks                    Chunk Names
    root-import.js  354 kB       0  [emitted]  [big]  root-import
      [55] ./root-import.js 101 bytes {0} [built]
        + 110 hidden modules

    WARNING in ../node_modules/redux-little-router/es/immutable/util/immutable.js
    Module not found: Error: Can't resolve 'immutable' in '/Users/rye/Desktop/TEMP_RLR/rlr-tree-shaking-experiment/node_modules/redux-little-router/es/immutable/util'
     @ ../node_modules/redux-little-router/es/immutable/util/immutable.js 14:14-34
     @ ../node_modules/redux-little-router/es/immutable/components/props-to-js.js
     @ ../node_modules/redux-little-router/es/immutable/components/link.js
     @ ../node_modules/redux-little-router/es/index.js
     @ ./root-import.js

    WARNING in root-import.js from UglifyJs
    Side effects in initialization of unused variable __WEBPACK_IMPORTED_MODULE_0_history_PathUtils___default [root-import.js:341,25]
    Side effects in initialization of unused variable addLeadingSlash [root-import.js:390,4]
    [...SNIPPED...]
✨  Done in 2.78s.
```