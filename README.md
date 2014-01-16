Handlebars Helpers Neo
---

HHN is a collection of 84 helper functions for use with [Handlebars.js](http://handlebarsjs.com).  It is inspired and based on [assemble.io's Handlebars Helpers collection](https://github.com/assemble/handlebars-helpers), but rewritten to be more portable and versatile as a standalone library, as Assemble's collection is built for use in their own environment.

The majority of functions have been rewritten with several purposes in mind:

- To be usable independently from the collection with no internal dependencies
- To be usable in both node.js and the browser, whenever possible
- To leverage the speed of ES5
- To support both return syntax (`{{helper}}`) and block syntax (`{{#helper}}do stuff{{/helper}}`) on all functions, where it makes sense
- To support `{{else}}` in all block statements, where it makes sense
- To support data framing on all loops with @index, @first and @last values.

#Installation

NPM: `npm install handlebars-helpers-neo`

Bower: `bower install handlebars-helpers-neo`

##Usage

In Node.js or another CommonJS environment, initialize the library like so:

```js
var Handlebars = require('handlebars');
require('handlebars-helpers-neo').load(Handlebars);
```

In a browser based AMD environment such as RequireJS:

```js
require(['handlebars', 'handlebars-helpers-neo'], function (Handlebars, HHN) {
  HHN.load(Handlebars);
});
```

In a standard browser environment:

```html
<script src="handlebars.js"></script>
<script src="hhn.all.js"></script>
<script>HandlebarsHelpersNeo.load(Handlebars);</script>
```

The `load()` function optionally supports a list of what helpers to load, if you do not want the entire library to be added to Handlebars' collection.

```js
//loads only the layout sub-templating functions
HandlebarsHelpersNeo.load(Handlebars, ['extend', 'block', 'content']);
```

###Helper Reference Documentation

Documentation is still being written, and there's a lot to write. Until then, check out the unit tests for each helper to see all supported usage examples. If you find any helpers without tests, please [let me know](http://twitter.com/ChiperSoft). (Note, `{{log}}` is lacking tests because there's no way to test console.log output)

##Building and Running Unit Tests

From inside the repository root, run `npm install` to install the NodeUnit dependency.

**With Grunt Installed**: `grunt test`

**Without Grunt Installed**: `npm test` (note, this runs against the last build, and only grunt is setup to create new builds)

##License

HHN is released under a standard MIT license, as defined in the LICENSE file.