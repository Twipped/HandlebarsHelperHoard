/**
 * Handlebars Helpers Neo
 *
 * A collection of helper functions for the Handlebars template engine.
 * Based upon work by @jonschlinkert and @doowb for Assemble.io
 *
 * Copyright (c) 2013-2014, Jarvis Badgley, Jon Schlinkert, Brian Woodward, contributers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


(function (context) {

var hhn = {};


hhn.utils = {

	//path that all readFile requests will be relative to
	_filesRelativeTo: !!process && !!process.cwd && process.cwd() || '',
	_fileCache: {},

	readFile: function (src) {
		if (!!process && !!process.cwd) {
			// we're probably running inside Node
			
			var grunt = require('grunt');

			return grunt.file.expand({cwd: hhn.utils._filesRelativeTo}, src).map(function (path) {
				return grunt.file.read(path);
			}).join(grunt.util.normalizelf(grunt.util.linefeed));

		} else {
			// we're probably running in a browser
			
			var content = '';
			if (Array.isArray(src)) {
				content = src.map(function (d) { return hhn.utils._fileCache[d] || '';}).join('/n');
			} else {
				content = hhn.utils._fileCache[src] || '';
			}
			return content;
		}
	},



	/**
	 * Flattens a nested array into a single level array
	 * @private
	 * @param  {Array} input The top level array to flatten
	 * @param  {boolean} [includingObjects=false] If an object is encountered and this argument is truthy, the object will also be flattened by its property values.
	 * @returns {Array}
	 */
	flatten: function (input) {
		var result = [];

		function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				result.push(level);
			}
		}

		descend(input);

		return result;
	},

	// extends the first argument object with the members of all other argument objects
	// (based on lo-dash.assign)
	extend: function (object) {
		if (!object) {
			return object;
		}
		for (var i = 1, c = arguments.length; i < c; i++) {
			var iterable = arguments[i];
			if (iterable) {
				for (var key in iterable) {
					object[key] = iterable[key];
				}
			}
		}
		return object;
	},

	createFrame: function (context, closure) {
		var o = Object.create(context || {});
		if (closure) hhn.utils.extend(o, closure);
		return o;
	}
};

hhn.helpers = (function () {
	var exports = {};


exports.embed = function (Handlebars, Utils) {
	return function (src, lang) {
		var content = Utils.readFile(src);
		var ext = src.split('.').pop();

		var output;
		if (!lang) {
			lang = ext;
		}
		
		switch (ext) {
		case 'md':
		case 'markdown':
		case 'mdown':
			output = content.replace(/^(```)/gm, '&#x60;&#x60;&#x60;');
			ext = 'md';
			break;
		case 'txt':
			output = content;
			ext = 'text';
			break;
		case 'hbs':
		case 'hbars':
			output = content.replace(/^(---)/gm, '---');
			ext = 'html';
			break;
		case 'less':
			output = content;
			ext = 'scss';
			break;
		case void 0:
			output = content;
			ext = '';
			break;
		default:
			output = content;
			ext = '';
		}
		var result = '```' + lang + '\n' + output + '\n```\n';
		return new Handlebars.SafeString(result);
	};
};

exports.gist = function (Handlebars) {
	return function (id) {
		id = Handlebars.Utils.escapeExpression(id);
		
		var result = '<script src="https://gist.github.com/' + id + '.js"></script>';
		
		return new Handlebars.SafeString(result);
	};
};

exports.jsfiddle = function (Handlebars) {
	return function (id, tabs) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "jsfiddle" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			tabs = 'result,js,html,css';
		} else if (Array.isArray(tabs)) {
			tabs = tabs.join(',');
		}
		
		var result = '<iframe width="100%" height="300" src="http://jsfiddle.net/' + id + '/embedded/' + tabs + '/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
		
		return new Handlebars.SafeString(result);
	};
};

/**
 * Returns all of the items in the collection after the specified count.
 * @param  {Array}  array Collection
 * @param  {Number} count Number of items to exclude
 * @return {Array}        Array excluding the number of items specified
 */
exports.after = function (Handlebars, utils) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "after" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = undefined;
		}

		var results = array.slice(count);
		if (!options.fn) {
			return results;
		} else {
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * {{all}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.all = function () {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "all" needs 1 parameter');
		}
		var i,c, yes = false;
		if (Array.isArray(input)) {
			yes = !!input[0];
			for (i = 1, c = input.length; i < c; i++) {
				
				if (!(yes = yes && !!input[i])) break;

			}
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = !!keys[0];
			for (i = 1, c = keys.length; i < c; i++) {

				if (!(yes = yes && !!input[i])) break;

			}
		} else if (input) {
			yes = !!input;
		}

		if (!options.fn) return yes;

		return yes ? options.fn(this) : options.inverse(this);
	};
};

/**
 * {{any}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.any = function () {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "any" needs 1 parameter');
		}
		var i,c, yes = false;
		if (Array.isArray(input)) {
			for (i = 0, c = input.length; i < c; i++) {
				if (input[i]) {
					yes = true;
					break;
				}
			}
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			for (i = 0, c = keys.length; i < c; i++) {
				if (input[keys[i]]) {
					yes = true;
					break;
				}
			}
		} else if (input) {
			yes = !!input;
		}

		if (!options.fn) return yes;

		return yes ? options.fn(this) : options.inverse(this);
	};
};

/**
 * Returns all of the items in the collection before the specified
 * count. Opposite of {{after}}.
 * @param  {Array}  array
 * @param  {number} count
 * @return {Array}
 */
exports.before = function (Handlebars, utils) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "before" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = undefined;
		}
		
		var results = array.slice(0, -count);
		if (!options.fn) {
			return results;
		} else {
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * {{empty}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.empty = function () {
	return function (input, options) {
		var i,c, yes = false;
		if (Array.isArray(input)) {
			yes = input.length <= 0;
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = keys.length <= 0;
		} else {
			yes = !input;
		}

		if (!options.fn) {
			return yes;
		} else {
			return yes ? options.fn(this) : options.inverse(this);
		}
	};
};


exports.filter = function (Handlebars, utils) {
	return function(input, value, property, options) {

		options = arguments[arguments.length - 1];

		var condition = function (d) { return d; };

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "filter" needs atleast 1 parameter');
		case 2:
			property = options.hash && options.hash.property;
			value = options.hash && options.hash.value;

			if (property && value) {
				condition = function (d) { return d[property] == value; };
			} else if (property) {
				condition = function (d) { return d[property] !== undefined; };
			} else if (value) {
				condition = function (d) { return d === value; };
			}
			break;
		case 3:
			condition = function (d) { return d === value; };
			break;

		default:
			condition = function (d) { return d[property] == value; };
			break;
		}

		var results = input.filter(condition);

		if (!options.fn) return results;

		var that = this;


		if(results && results.length > 0) {
			var data = utils.createFrame(options.data);
			return results.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === results.length - 1);
				return options.fn(result, {data: data});
			}).join('');
		} else {
			return options.inverse(this);
		}
		return content;
	};
};



/**
 * {{first}}
 * Returns the first item in a collection.
 *
 * @param  {Array}  array
 * @param  {[type]} count
 * @return {[type]}
 */
exports.first = function (Handlebars, utils) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "first" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? array.slice(0, count) : array[0];
		} else {
			var results = count ? array.slice(0, count) : [array[0]];
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * {{inArray}}
 *
 * @param  {Array}  array   [description]
 * @param  {[type]} value   [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
exports.inArray = function () {
	return function (input, value, options) {
		var result = input.indexOf(value) >= 0;

		if (!options.fn) return result;
		
		return result ? options.fn(this) : options.inverse(this);
	};
};

/**
 * Joins all elements of a collection into a string
 * using a separator if specified.
 * @param  {Array}  array     [description]
 * @param  {[type]} separator [description]
 * @return {[type]}           [description]
 */
exports.join = function (Handlebars, utils) {
	return function (array, separator, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "join" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			separator = undefined;
		}

		if (!array.length) {
			return options.inverse(this);
		}

		if (options.fn) {
			var data = utils.createFrame(options.data);
			array = array.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === array.length - 1);
				return options.fn(result, {data: data});
			});
		}
		
		return array.join(separator);
	};
};

exports.keys = function (Handlebars, utils) {
	return function (array, options) {
		if (!Array.isArray(array) && typeof array === 'object') {
			array = Object.keys(array);
		} else {
			array = array.map(function (v, k) { return k; });
		}

		if (!options.fn) {
			return array;
		} else {
			if (array.length) {
				var data = utils.createFrame(options.data);
				return array.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === array.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * Returns the last item in a collection. Opposite of `first`.
 * @param  {Array}  array [description]
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
exports.last = function (Handlebars, utils) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "last" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? array.slice(-count) : array[array.length - 1];
		} else {
			var results = count ? array.slice(-count) : [array[array.length - 1]];
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}

	};
};

exports.length = function () {
	return function (array, length, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "length" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			length = false;
		}

		var results;
		if (array.length !== undefined) {
			results = array.length;
		} else if (typeof array === 'object') {
			results = Object.keys(array).length;
		} else {
			results = !!array;
		}

		if (!options.fn) return length === false ? results : results === length && length || 0;

		if (length === false ? results : results === length) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

/**
 * {{empty}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.notEmpty = function () {
	return function (input, options) {
		var i,c, yes = false;
		if (Array.isArray(input)) {
			yes = input.length > 0;
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = keys.length > 0;
		} else {
			yes = !!input;
		}

		if (!options.fn) {
			return yes;
		} else {
			return yes ? options.fn(this) : options.inverse(this);
		}
	};
};

/**
 * Returns all of the items in the collection before the specified
 * count. Opposite of {{after}}.
 * @param  {Array}  array
 * @param  {string} start
 * @param  {number} count
 * @return {Array}
 */
exports.slice = function (Handlebars, utils) {
	return function (array, start, count, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "slice" needs 2 parameters');
		case 2:
			start = undefined;
			count = undefined;
			break;
		case 3:
			count = undefined;
			break;
		}

		var results = array.slice(start, count);

		if (!options.fn) {
			return results;
		} else {
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

exports.sort = function (Handlebars, utils) {
	return function (array, field, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "sort" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			field = undefined;
		}


		var results;
		if (field === undefined) {
			results = array.sort();
		} else {
			results = array.sort(function (a, b) {
				return a[field] > b[field];
			});
		}

		if (!options.fn) {
			return results;
		} else {
			if (results.length) {
				var data = utils.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * {{split}}
 * Converts a string such as "foo, bar, baz" to an ES Array of strings.
 * @credit: http://bit.ly/1840DsB
 * @param  {string} str
 * @return {Array}
 */
exports.split = function (Handlebars, utils) {
	return function (str, delimiter, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "split" needs at least 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			delimiter = undefined;
		}

		var results = str.split(delimiter);

		if (!options.fn) {
			return results;
		} else {
			var data = utils.createFrame(options.data);
			return results.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === results.length - 1);
				return options.fn(result, {data: data});
			}).join('');
		}
	};
};

exports.values = function (Handlebars, utils) {
	return function (array, options) {
		if (!Array.isArray(array) && typeof array === 'object') {
			array = Object.keys(array).map(function (k) { return array[k]; });
		}

		if (!options.fn) {
			return array;
		} else {
			if (array.length) {
				var data = utils.createFrame(options.data);
				return array.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === array.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};

/**
 * And
 * Conditionally render a block if all of the values is truthy.
 */
exports.and = function () {
	return function (a, b, options) {
		var args = [].slice.call(arguments, 1);
		options = args.pop();

		var i = 0, c = args.length, result = a;
		for (; i < c; i++) {
			result = result && args[i];
			if (!result) break;
		}

		if (!options.fn) return result;

		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.compare = function () {
	return function(left, operator, right, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "compare" needs 2 parameters');
		}

		if (options === undefined) {
			options = right;
			right = operator;
			operator = '===';
		}

		var operators = {
			'==':     function(l, r) {return l == r; },
			'===':    function(l, r) {return l === r; },
			'!=':     function(l, r) {return l != r; },
			'!==':    function(l, r) {return l !== r; },
			'<':      function(l, r) {return l < r; },
			'>':      function(l, r) {return l > r; },
			'<=':     function(l, r) {return l <= r; },
			'>=':     function(l, r) {return l >= r; },
			'typeof': function(l, r) {return typeof l == r; },
			'%':      function(l, r) {return l % r; }
		};

		if (!operators[operator]) {
			throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
		}

		var result = !!operators[operator](left, right);

		if (!options.fn) return result;

		return result ? options.fn(this) : options.inverse(this);
	};
};

/**
 * {{contains}}
 *
 * @param  {*}  input   [description]
 * @param  {*} value   [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
exports.contains = function () {
	return function (input, value, options) {
		var result = input.indexOf(value) >= 0;
		if (!options.fn) return result;
		return result ? options.fn(this) : options.inverse(this);
	};
};

exports.gt = function () {
	return function (value, test, options) {
		if (!options.fn) return value > test;
		if (value > test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.gte = function () {
	return function (value, test, options) {
		if (!options.fn) return value >= test;
		if (value >= test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.is = function () {
	return function (value, test, options) {
		if (!options.fn) return value === test;
		if (value === test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.isLike = function () {
	return function (value, test, options) {
		if (!options.fn) return value == test;
		if (value == test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.isnt = function () {
	return function (value, test, options) {
		if (!options.fn) return value !== test;
		if (value !== test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.isntLike = function () {
	return function (value, test, options) {
		if (!options.fn) return value != test;
		if (value != test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.lt = function () {
	return function (value, test, options) {
		if (!options.fn) return value < test;
		if (value < test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.lte = function () {
	return function (value, test, options) {
		if (!options.fn) return value <= test;
		if (value <= test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

/**
 * Or
 * Conditionally render a block if one of the values is truthy.
 */
exports.or = function () {
	return function (a, b, options) {
		var args = [].slice.call(arguments, 1);
		options = args.pop();

		var i = 0,
			c = args.length,
			result = a;

		for (; i < c; i++) {
			if (result) break;
			result = result || args[i];
		}

		if (!options.fn) return result;

		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
};

exports.log = function () {
	return function (value, options) {
		if (arguments.length === 1) {
			console.log(this);
		} else {
			var args = [].slice.call(arguments, 0, arguments.length - 2);
			console.log(args);
		}
	};
};

	return exports;
})();


hhn.load = function () {
	var args = [].slice.call(arguments),
		Handlebars = args.shift(),
		i = 0,
		c = args.length,
		helper;

	args = hhn.utils.flatten(args);
	c = args.length;

	// if no helpers were defined, load all of them.
	if (!c) {
		args = Object.keys(hhn.helpers);
		c = args.length;
	}

	for (;i < c; i++) {
		helper = hhn.helpers[args[i]](Handlebars, hhn.utils);
		Handlebars.registerHelper(args[i], helper);
	}
};


if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
	//Running inside node
	module.exports = hhn;

} else if ( typeof define === 'function' && define.amd ) {
	//Running inside an AMD loader
	define([], function () {return hhn;});
	
} else {
	//Dunno where we are, add it to the global context with a noConflict

	var previous = context.HandlebarsHelpersNeo;
	hhn.noConflict = function () {
		context.HandlebarsHelpersNeo = previous;
		return hhn;
	};
	context.HandlebarsHelpersNeo = hhn;

}

})(this);