Handlebars Helper Hoard
---

[![NPM version](https://img.shields.io/npm/v/helper-hoard.svg)](http://badge.fury.io/js/helper-hoard)
[![Licensed MIT](https://img.shields.io/npm/l/helper-hoard.svg)](https://github.com/ChiperSoft/HandlebarsHelperHoard/blob/master/LICENSE.txt)
[![Nodejs 0.10+](https://img.shields.io/badge/node.js-%3E=_0.10-brightgreen.svg)](http://nodejs.org)
[![Downloads](http://img.shields.io/npm/dm/helper-hoard.svg)](http://npmjs.org/helper-hoard)
[![Build Status](https://img.shields.io/travis/ChiperSoft/HandlebarsHelperHoard.svg)](https://travis-ci.org/ChiperSoft/HandlebarsHelperHoard)
[![Gittip](http://img.shields.io/gittip/chipersoft.svg)](https://www.gittip.com/chipersoft/)

Helper Hoard is a collection of 84 helper functions for use with [Handlebars.js](http://handlebarsjs.com).  It is inspired and based on [assemble.io's Handlebars Helpers collection](https://github.com/assemble/handlebars-helpers), but rewritten to be more portable and versatile as a standalone library, as Assemble's collection is built for use in their own environment.

The majority of functions have been rewritten with several purposes in mind:

- To be usable independently from the collection with no internal dependencies
- To be usable in both node.js and the browser, whenever possible
- To leverage the speed of ES5
- To support both return syntax (`{{helper}}`) and block syntax (`{{#helper}}do stuff{{/helper}}`) on all functions, where it makes sense
- To support `{{else}}` in all block statements, where it makes sense
- To support data framing on all loops with `@index`, `@first` and `@last` values.

#Requirements

The Hoard as a whole has only a single dependency, it expects to be running in an ES5 environment. That means you will need [es5-shim](https://github.com/es-shims/es5-shim) to use the library in IE8 or below.  Node.js and all modern browsers should be without issue.

The following helpers have specific dependencies:

- `{{embed}}` only works in Node.js, as it uses the `file` and `path` modules.
- `{{date}}` and `{{fromNow}}` both require [Moment.js](http://momentjs.com), which is used to handle the date formatting. Moment is installed by npm as a dependency. In the browser the library must be loaded before the template is invoked, either via a script include or using Browserify or RequireJS (it will attempt to load via `require()` if present).

#Installation

NPM: `npm install helper-hoard`

Bower: `bower install helper-hoard`

##Usage

In Node.js or another CommonJS environment, initialize the library like so:

```js
var Handlebars = require('handlebars');
require('helper-hoard')(Handlebars);
```

In a browser based AMD environment such as RequireJS:

```js
require(['handlebars', 'helper-hoard'], function (Handlebars, Hoard) {
  Hoard(Handlebars);
});
```

In a standard browser environment:

```html
<script src="handlebars.js"></script>
<script src="hoard.all.js"></script>
<script>HelperHoard(Handlebars);</script>
```

The `load()` function optionally supports a list of what helpers to load, if you do not want the entire library to be added to Handlebars' collection.

```js
//loads only the layout sub-templating functions
HelperHoard(Handlebars, ['extend', 'block', 'content']);
```

###Helper Reference Documentation

Documentation is still being written, and there's a lot to write. Until then, [check out the unit tests](https://github.com/ChiperSoft/HandlebarsHelperHoard/tree/master/tests) for each helper to see all supported usage examples. If you find any helpers without tests, please [let me know](http://twitter.com/ChiperSoft). (Note, `{{log}}` is lacking tests because there's no way to test console.log output)

##Building and Running Unit Tests

From inside the repository root, run `npm install` to install the dev dependencies, and then `npm test` to kick off the build and test process.

##Building custom compilations

Helper Hoard provides a build tool for assembling your own version of HH composed of a reduced set of functions.  Installing HH globally via NPM will make this utility available from the command line.

```
npm install -g helper-hoard
```

The utility supports the following options:

```
-o, --output <path>    build destination (defaults to helper-hoard.custom.js in the current directory)
-s, --stdout           output the result to stdout
-m, --minify           minify the output using UglifyJS
-i, --helpers <flags>  comma or space separated list of +additions or -exclusions
--list                 list all available helpers and helper groups available for selection
```

You may then create a custom build by calling the `helper-hoard` utility.  Changes from the standard set are indicated via the `--helpers` argument, as a quoted comma separated list.  Prefix a helper or helper group with a minus to remove it from the set.  If the first item in the list is *not* an exclusion, the builder will assume you are explicitly including.

Examples:

- `helper-hoard --helpers="str-group -slugify"` String functions only, excluding the slugify helper.
- `helper-hoard --helpers="-nonbrowser"` All helpers except those which use node-only functionality, such as the fs module.
- `helper-hoard -mo hoard.min.js` Output a minified build to a custom file name.

##License

Helper Hoard is released under a standard MIT license, as defined in the LICENSE file.
