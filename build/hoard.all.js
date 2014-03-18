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

var hoard = {};


hoard.helpers = (function () {
	var exports = {};


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


exports.link = function (Handlebars) {
	return function (input) {
		
		function makeLink(src) {
			var ext = src.split('.').pop();
			switch (ext) {
			case 'css':
				return '<link rel="stylesheet" href="' + src + '">';
			case 'less':
				return '<link rel="stylesheet/less" href="' + src + '">';
			case 'html':
				return '<link rel="import" href="' + src + '">';
			}
		}

		if (Array.isArray(input)) {
			return new Handlebars.SafeString(input.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(input));
		}

	};
};


exports.ol = function (Handlebars) {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ol" needs 1 parameter');
		}

		var stack = ['<ol'];

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {
				stack.push(' ' + key + '="' + hash[key] + '"');
			});
		}

		stack.push('>');

		if (!Array.isArray(input)) {
			input = [input];
		}

		if (!options.fn) {
			input.forEach(function (item, i) {
				stack.push('<li>' + Handlebars.Utils.escapeExpression(item) + '</li>');
			});
		} else {
			if (input.length) {
				var data = Handlebars.createFrame(options.data);
				input.forEach(function (item, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === input.length - 1);
					stack.push('<li>' + options.fn(item, {data: data}) + '</li>');
				});
			} else {
				stack.push('<li>' + options.inverse(this) + '</li>');
			}
		}

		stack.push('</ol>');

		return new Handlebars.SafeString(stack.join(''));
	};
};


exports.script = function (Handlebars) {
	return function (input) {
		
		function makeLink(src) {
			var ext = src.split('.').pop();
			switch (ext) {
			case 'js':
				return '<script src="' + src + '"></script>';
			case 'coffee':
				return '<script type="text/coffeescript" src="' + src + '"></script>';
			case 'hbs':
				return '<script type="text/handlebars" src="' + src + '"></script>';
			}
		}

		if (Array.isArray(input)) {
			return new Handlebars.SafeString(input.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(input));
		}

	};
};


exports.ul = function (Handlebars) {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ul" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		var stack = ['<ul'];

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {
				stack.push(' ' + key + '="' + hash[key] + '"');
			});
		}

		stack.push('>');

		if (!Array.isArray(input)) {
			input = [input];
		}

		if (!options.fn) {
			input.forEach(function (item, i) {
				stack.push('<li>' + Handlebars.Utils.escapeExpression(item) + '</li>');
			});
		} else {
			if (input.length) {
				var data = Handlebars.createFrame(options.data);
				input.forEach(function (item, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === input.length - 1);
					stack.push('<li>' + options.fn(item, {data: data}) + '</li>');
				});
			} else {
				stack.push('<li>' + options.inverse(this) + '</li>');
			}
		}

		stack.push('</ul>');

		return new Handlebars.SafeString(stack.join(''));
	};
};

/**
 * Returns all of the items in the collection after the specified count.
 * @param  {Array}  array Collection
 * @param  {Number} count Number of items to exclude
 * @return {Array}        Array excluding the number of items specified
 */
exports.after = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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
exports.before = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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


exports.filter = function (Handlebars) {
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
			var data = Handlebars.createFrame(options.data);
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
exports.first = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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
exports.join = function (Handlebars) {
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
			var data = Handlebars.createFrame(options.data);
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

exports.keys = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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
exports.last = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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
exports.slice = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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

exports.sort = function (Handlebars) {
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
				var data = Handlebars.createFrame(options.data);
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
exports.split = function (Handlebars) {
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
			var data = Handlebars.createFrame(options.data);
			return results.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === results.length - 1);
				return options.fn(result, {data: data});
			}).join('');
		}
	};
};

exports.values = function (Handlebars) {
	return function (array, options) {
		if (!Array.isArray(array) && typeof array === 'object') {
			array = Object.keys(array).map(function (k) { return array[k]; });
		}

		if (!options.fn) {
			return array;
		} else {
			if (array.length) {
				var data = Handlebars.createFrame(options.data);
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

		options = arguments[arguments.length - 1];

		if (arguments.length === 3) {
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

/**
 * {{has}}
 *
 * @param  {*}  input   [description]
 * @param  {*} value   [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
exports.has = function () {
	return function (input, value, options) {
		var result = input.indexOf(value) >= 0;
		if (!options.fn) return result;
		return result ? options.fn(this) : options.inverse(this);
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

exports.default = function () {
	return function (value, fallback, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "default" needs 2 parameters');
		}

		return value || fallback;
	};
};

exports.inject = function () {
	return function (options) {
		var context = this;

		options = arguments[arguments.length - 1];

		if (options.fn) {
			context = Object.create(this || null);
		}

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {

				var value = options.hash[key];
				if (String(value)[0] === '{') {
					value = JSON.parse(value);
				}

				context[key] = value;
			});
		}

		return options.fn && options.fn(context) || '';
	};
};

exports.stringify = function (Handlebars) {
	return function (input, pretty, options) {

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "stringify" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			pretty = undefined;
		} else {
			if (pretty && typeof pretty !== 'string') {
				pretty = '  ';
			}
		}

		return new Handlebars.SafeString(JSON.stringify(input, undefined, pretty));
	};
};

exports.date = function () {
	return function (format, input, options) {
		var moment = require && require('moment') || this.moment;
		if (!moment) {
			throw new Error('Handlebars Helper "date" requires that the Moment.js library be loaded before using in a template.');
		}

		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			format = 'YYYY-MM-DD HH:mm:ss';
			input = moment();
			break;
		case 2:
			input = moment();
			break;
		case 3:
			input = moment(input, options.hash && options.hash.parse || undefined);
			break;
		}

		if (!input.isValid()) {
			return '';
		}

		return input.format(format);
	};
};


exports.fromNow = function () {
	return function (input, options) {
		var moment = require && require('moment') || this.moment;
		if (!moment) {
			throw new Error('Handlebars Helper "date" requires that the Moment.js library be loaded before using in a template.');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "fromNow" needs 1 parameter');
		} else {
			input = moment(input, options.hash && options.hash.parse || undefined);
		}

		if (!input.isValid()) {
			return '';
		}

		return input.fromNow();
	};
};


exports.log = function () {
	return function (value, options) {
		if (arguments.length === 1) {
			console.log(this);
		} else {
			var args = [].slice.call(arguments, 0, arguments.length - 1);
			console.log(args);
		}
	};
};

exports.embed = function (Handlebars) {
	return function (src, cwd) {
		var fs = require('fs');
		var path = require('path');

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "embed" needs 1 parameter');
		case 2:
			cwd = process.cwd();
		}

		var filepath = path.resolve(cwd, src);
		var content = fs.readFileSync(filepath);
		
		return new Handlebars.SafeString(content);
	};
};

exports.append = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "append" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: 'append',
			fn: options.fn
		};
	};
};

exports.block = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "block" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};
		
		var block = this._blocks[name];

		var optionsFn = options.fn || function () {return '';};

		var result;
		switch (block && block.fn && block.mode) {
		case 'append':
			result = optionsFn(this) + block.fn(this);
			break;
		case 'prepend':
			result = block.fn(this) + optionsFn(this);
			break;
		case 'replace':
			result = block.fn(this);
			break;
		default:
			result = optionsFn(this);
			break;
		}

		return new Handlebars.SafeString(result);
	};
};

exports.content = function (Handlebars) {
	return function (name, mode, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "content" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (!mode || arguments.length === 2) {
			mode = options.hash && options.hash.mode || 'replace';
		}

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: mode.toLowerCase(),
			fn: options.fn
		};
	};
};

exports.extend = function (Handlebars) {
	return function (layout, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "extend" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		var context = Object.create(this || null);
		var template = Handlebars.partials[layout];

		if (typeof template === 'undefined') {
			throw new Error("Missing layout: '" + layout + "'");
		}

		if (typeof template === 'string') {
			template = Handlebars.compile(template);
		}

		if (options.fn) {
			// run the contents of the embed so that the content blocks apply
			// but don't use the output.
			options.fn(context);
		}

		return new Handlebars.SafeString(template(context));
	};
};

exports.prepend = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "prepend" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: 'prepend',
			fn: options.fn
		};
	};
};

exports.add = function () {
	return function (valueA, valueB) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "block" needs 1 parameter minimum');
		}

		var value = 0;

		//with the arguments array as an entry point, descend into any sub-arrays for values to add to the total.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				value += parseInt(level, 10);
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.ceil = function () {
	return function (value, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "ceil" needs 1 parameter minimum');
		}

		return Math.ceil(value);
		
	};
};

exports.div = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "div" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to divide the initial value by.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else if (level) {
					value = value / parseInt(level, 10);
				}			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.floor = function () {
	return function (value, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "floor" needs 1 parameter minimum');
		}

		return Math.floor(value);
		
	};
};

exports.max = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "max" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to min against
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else {
					value = Math.max(value, parseInt(level, 10));
				}
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.min = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "min" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to min against
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else {
					value = Math.min(value, parseInt(level, 10));
				}
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.mul = function () {
	return function (valueA, valueB, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "mul" needs 1 parameter minimum');
		}

		var value = 1;

		//with the arguments array as an entry point, descend into any sub-arrays for values to multiply the initial value by.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				value = value * parseInt(level, 10);
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.pi = function () {
	return function () {
		return Math.PI;
	};
};

exports.pow = function () {
	return function (valueA, valueB, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "pow" needs 2 parameters minimum');
		}

		return Math.pow(valueA, valueB);
		
	};
};

exports.random = function () {
	return function (low, high, options) {
		switch (arguments.length) {
		case 1:
			return Math.random();
		case 2:
			low = 0;
			high = arguments[0];
			break;
		}

		return Math.floor(Math.random()*(high-low)+low);
		
	};
};

exports.round = function () {
	return function (value, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "round" needs 1 parameter minimum');
		}

		return Math.round(value);
		
	};
};

exports.sub = function () {
	return function (valueA, valueB, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "sub" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to subtract from the initial value.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else {
					value = value - parseInt(level, 10);
				}
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};

exports.contains = function () {
	return function (haystack, needle, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "contains" needs 2 parameters');
		}

		if (options.hash && options.hash.regex) {
			needle = new RegExp(needle);
		}

		var result = haystack.split(needle).length - 1;

		if (!options.fn) {
			return result;
		}

		return result ? options.fn(this) : options.inverse(this);

	};
};

exports.endsWith = function () {
	return function (haystack, needle, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "endsWith" needs 2 parameters');
		}

		//make sure we have strings
		haystack = ''+haystack;
		needle = ''+needle;

		var result = haystack.substr(-needle.length) === needle;

		if (!options.fn) {
			return result;
		}

		return result ? options.fn(this) : options.inverse(this);
	};
};


exports.humanBytes = function (Handlebars) {
	return function (value) {
		var bytes = Math.abs(parseInt(value, 10));
		if (isNaN(bytes)) {
			console.error("Handlebars helper fileSize couldn't parse '" + value + "'");
			return value; // Graceful degradation
		}
		
		var resInt, resValue;
		var metric = ['byte', 'bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) {
			resInt = resValue = 0;
		} else {
			// Base 1000 (rather than 1024) matches Mac OS X
			resInt = Math.floor(Math.log(bytes) / Math.log(1000));
			// No decimals for anything smaller than 1 MB
			resValue = (bytes / Math.pow(1000, Math.floor(resInt)));
			//only show a decimal place if the decimal will round to something other than .0
			resValue = resValue.toFixed(resValue % 1 > 0.1 ? 1 : 0)
			if (bytes === 1) {
				resInt = -1; // special case: 1 byte (singular)
			}
		}
		if (resInt + 1 < metric.length) {
			return resValue + ' ' + metric[resInt + 1];
		} else {
			//The number we have is higher than our highest unit, so express it as a value of our highest unit
			return resValue * Math.pow(10, metric.length + 2 - resInt) + ' ' + metric[metric.length - 1];
		}
		
	};
};

exports.humanMilliseconds = function (Handlebars) {
	return function (seconds, detailed) {

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "humanMilliseconds" needs 1 parameter');
		case 2:
			detailed = false;
			break;
		}

		var keys  = ['Year',      'Month',    'Week',    'Day',    'Hour',    'Minute',    'Second', 'Millisecond'],
			divs  = [31536000000, 2592000000, 604800000, 86400000, 3600000,   60000,       1000,     1],
			stack = [],
			level = 0,
			value;

		seconds = Math.abs(seconds);

		while (seconds) {
			value = Math.floor(seconds / divs[level]);
			seconds = seconds % divs[level];
			if (value) {
				stack.push( value + ' ' + keys[level] + (value > 1 ? 's' : ''));
				if (!detailed) break;
			}
			level++;
		}

		return stack.join(' ');

	};
};

exports.humanNumber = function () {
	return function (number, digits) {
		if (arguments.length < 1) {
			throw new Error('Handlebars Helper "numberAbbr" needs 1 parameter minimum');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2 || digits === undefined) {
			digits = 2;
		}

		digits = Math.pow(10, digits);

		var abbr = ["k", "m", "b", "t"];

		var i = abbr.length - 1;

		while (i >= 0) {
			var size = Math.pow(10, (i + 1) * 3);
			if (size <= number) {
				number = Math.round(number * digits / size) / digits;

				// Special case where we round up to the next abbreviation
				if ((number === 1000) && (i < abbr.length - 1)) {
					number = 1;
					i++;
				}
				
				number += abbr[i];
				break;
			}
			i--;
		}
		return number;
	};
};

exports.humanSeconds = function (Handlebars) {
	return function (seconds, detailed) {

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "humanSeconds" needs 1 parameter');
		case 2:
			detailed = false;
			break;
		}

		var keys  = ['Year',  'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
			divs  = [31536000, 2592000, 604800, 86400, 3600,   60,       1],
			stack = [],
			level = 0,
			value;

		seconds = Math.abs(seconds);

		while (seconds) {
			value = Math.floor(seconds / divs[level]);
			seconds = seconds % divs[level];
			if (value) {
				stack.push( value + ' ' + keys[level] + (value > 1 ? 's' : ''));
				if (!detailed) break;
			}
			level++;
		}

		return stack.join(' ');

	};
};

exports.inflect = function (Handlebars) {
	return function (count, singular, plural, include, options) {
		if (arguments.length < 4) {
			throw new Error('Handlebars Helper "inflect" needs 3 parameters');
		}

		options = arguments[arguments.length - 1];

		var word = count > 1 || count === 0 ? plural : singular;
		if (arguments.length <= 4 || include === undefined || include === false) {
			return word;
		} else {
			return "" + count + " " + word;
		}
	};
};

exports.lowercase = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "lowercase" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		return (''+input).toLowerCase();
	};
};

exports.numberFormat = function () {
	return function (number, precision, decimalPoint, thousands) {
		// account for options argument
		var argc = arguments.length - 1;

		if (argc === 0) {
			throw new Error('Handlebars Helper "numberFormat" needs 1 parameter minimum');
		}

		if (argc === 3 || thousands === undefined) {
			thousands = ',';
		}

		if (argc === 2 || decimalPoint === undefined) {
			decimalPoint = '.';
		}

		if (argc === 1 || precision === undefined) {
			precision = 0;
		} else {
			precision = parseInt(precision, 10);
		}

		//strip any non-numeric characters
		number = ('' + number).replace(/[^0-9+\-Ee.]/g, '');

		var result;
		if (precision) {
			// round at the needed precision and then split on the decimal.
			var k = Math.pow(10, precision);
			result = ('' + Math.round(number * k) / k).split('.');

			// if no decimal existed, make sure we create a place for it.
			if (result.length === 1) result.push('');
		} else {
			// parse as float and round off, then store in an array to simplify below.
			result = [Math.round(parseFloat(number))];
		}

		//insert any thousands marks as needed
		if (thousands) {
			result[0] = ('' + result[0]).replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands);
		}

		// pad out the decimal places as needed
		if (precision && result[1].length < precision) {
			result[1] += new Array(precision - result[1].length + 1).join('0');
		}

		return precision ? result.join(decimalPoint) : result[0];
		
	};
};

exports.ordinalize = function (Handlebars) {
	return function (value) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ordinalize" needs 1 parameter');
		}

		var normal = Math.abs(Math.round(value));
		if ([11, 12, 13].indexOf(normal % 100) >= 0) {
			return "" + value + "th";
		} else {
			switch (normal % 10) {
			case 1:
				return "" + value + "st";
			case 2:
				return "" + value + "nd";
			case 3:
				return "" + value + "rd";
			default:
				return "" + value + "th";
			}
		}
	};
};

exports.padCenter = function (Handlebars) {
	return function (input, length, using, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				throw new Error('Handlebars Helper "padCenter" needs 2 parameters minimum');
			} else {
				input = options.fn(this);
				length = options.hash && options.hash.length || 0;
				using = options.hash && options.hash.using || ' ';
			}
			break;
		case 2:
			length = 0;
			using = ' ';
			break;
		case 3:
			using = ' ';
			break;
		}

		//make sure we've got a string
		input = ''+input;

		if (length < input.length) {
			return input;
		}

		var len   = input.length,
			left  = Math.floor((length - len) / 2),
			right = Math.ceil((length - len) / 2);

		return new Array(left + 1).join(using) + input + new Array(right + 1).join(using);

	};
};

exports.padLeft = function (Handlebars) {
	return function (input, length, using, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				throw new Error('Handlebars Helper "padLeft" needs 2 parameters minimum');
			} else {
				input = options.fn(this);
				length = options.hash && options.hash.length || 0;
				using = options.hash && options.hash.using || ' ';
			}
			break;
		case 2:
			length = 0;
			using = ' ';
			break;
		case 3:
			using = ' ';
			break;
		}

		//make sure we've got a string
		input = ''+input;

		if (length < input.length) {
			return input;
		}

		return input + new Array(length - input.length + 1).join(using);

	};
};

exports.padRight = function (Handlebars) {
	return function (input, length, using, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				throw new Error('Handlebars Helper "padRight" needs 2 parameters minimum');
			} else {
				input = options.fn(this);
				length = options.hash && options.hash.length || 0;
				using = options.hash && options.hash.using || ' ';
			}
			break;
		case 2:
			length = 0;
			using = ' ';
			break;
		case 3:
			using = ' ';
			break;
		}

		//make sure we've got a string
		input = ''+input;

		if (length < input.length) {
			return input;
		}

		return new Array(length - input.length + 1).join(using) + input;

	};
};

exports.phone = function () {
	return function (number) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "phoneNumber" needs 1 parameter minimum');
		}

		//strip non digits
		number = (''+number).replace(/[^0-9]/, '');

		if (number.length < 10) {
			return number;
		}

		var stack = ['(', number.substr(-10,3), ') ', number.substr(-7, 3), '-', number.substr(-4)];

		if (number.length > 10) {
			stack.unshift(number.substr(0, number.length - 10)+' ');
		}

		return stack.join('');
	};
};

exports.replace = function () {
	return function (haystack, needle, replacement, options) {
		options = arguments[arguments.length - 1];

		var hashNeedle = options.hash && options.hash.search,
			hashReplace = options.hash && options.hash.replace,
			hashRegex = options.hash && options.hash.regex;

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				if (hashNeedle === undefined) {
					throw new Error('Handlebars Helper "replace" needs a search string');
				}
			} else {
				haystack = options.fn(this);
				needle = hashNeedle;
				replacement = hashReplace || '';
			}
			break;

		case 2:
			if (!options.fn) {
				if (hashNeedle === undefined) {
					throw new Error('Handlebars Helper "replace" needs a search string');
				}

				needle = hashNeedle || arguments[0];
				replacement = hashReplace || '';
			} else {
				haystack = options.fn(this);
				needle = hashNeedle || arguments[0];
				replacement = hashReplace || '';
			}
			break;
		case 3:
			if (!options.fn) {
				replacement = '';
			} else {
				haystack = options.fn(this);
				needle = hashNeedle || arguments[0];
				replacement = hashReplace || arguments[1];
			}
			break;
		}

		if (hashRegex) {
			needle = new RegExp(needle);
		}

		return haystack.replace(needle, replacement);

	};
};

exports.reverse = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "reverse" needs 1 parameter minimum');
			}

			input = options.fn(this);
		}

		if (typeof input === 'string') {
			return input.split('').reverse().join('');
		} else if (typeof input === 'number') {
			return 0-input;
		} else if (Array.isArray(input)) {
			return input.reverse();
		} else {
			throw new Error('Handlebars Helper "reverse" cannot operate upon '+(typeof input)+'s.');
		}

	};
};

exports.slugify = function () {
	return function (input, delimiter, separators) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "slugify" needs 1 parameter');
		case 2:
			delimiter = '-';
			separators = false;
			break;
		case 3:
			separators = false;
			break;
		}

		var i = separators && separators.length,
			slug = input,
			delimiter = delimiter || '-',
			regexEscape = new RegExp(/[[\/\\^$*+?.()|{}\]]/g),
			regexDelimiter = delimiter.replace(regexEscape, "\\$&"),
			prohibited = new RegExp("([^a-z0-9" + regexDelimiter + "])", "g"),
			consecutive = new RegExp("(" + regexDelimiter + "+)", "g"),
			trim = new RegExp("^" + regexDelimiter + "*(.*?)" + regexDelimiter + "*$"),
			sanitizer = {
				// common latin
				'á': 'a',
				'à': 'a',
				'â': 'a',
				'ä': 'a',
				'ã': 'a',
				'æ': 'ae',
				'ç': 'c',
				'é': 'e',
				'è': 'e',
				'ê': 'e',
				'ë': 'e',
				'ẽ': 'e',
				'í': 'i',
				'ì': 'i',
				'î': 'i',
				'ï': 'i',
				'ĩ': 'i',
				'ó': 'o',
				'ò': 'o',
				'ô': 'o',
				'ö': 'o',
				'õ': 'o',
				'œ': 'oe',
				'ß': 'ss',
				'ú': 'u',
				'ù': 'u',
				'û': 'u',
				'ü': 'u',
				'ũ': 'u',

				// other diacritics
				'ă': 'a',
				'ắ': 'a',
				'ằ': 'a',
				'ẵ': 'a',
				'ẳ': 'a',
				'ấ': 'a',
				'ầ': 'a',
				'ẫ': 'a',
				'ẩ': 'a',
				'ǎ': 'a',
				'å': 'a',
				'ǻ': 'a',
				'ǟ': 'a',
				'ȧ': 'a',
				'ǡ': 'a',
				'ą': 'a',
				'ā': 'a',
				'ả': 'a',
				'ȁ': 'a',
				'ȃ': 'a',
				'ạ': 'a',
				'ặ': 'a',
				'ậ': 'a',
				'ḁ': 'a',
				'ⱥ': 'a',
				'ᶏ': 'a',
				'ɐ': 'a',
				'ɑ': 'a',
				
				'ḃ': 'b',
				'ḅ': 'b',
				'ḇ': 'b',
				'ƀ': 'b',
				'ɓ': 'b',
				'ƃ': 'b',
				'ᵬ': 'b',
				'ᶀ': 'b',
				'þ': 'b',
				
				'ć': 'c',
				'ĉ': 'c',
				'č': 'c',
				'ċ': 'c',
				'ḉ': 'c',
				'ȼ': 'c',
				'ƈ': 'c',
				'ɕ': 'c',
				
				'ď': 'd',
				'ḋ': 'd',
				'ḑ': 'd',
				'ḍ': 'd',
				'ḓ': 'd',
				'ḏ': 'd',
				'đ': 'd',
				'ɖ': 'd',
				'ɗ': 'd',
				'ƌ': 'd',
				'ᵭ': 'd',
				'ᶁ': 'd',
				'ᶑ': 'd',
				'ȡ': 'd',
				'∂': 'd',

				'ĕ': 'e',
				'ế': 'e',
				'ề': 'e',
				'ễ': 'e',
				'ể': 'e',
				'ě': 'e',
				'ė': 'e',
				'ȩ': 'e',
				'ḝ': 'e',
				'ę': 'e',
				'ē': 'e',
				'ḗ': 'e',
				'ḕ': 'e',
				'ẻ': 'e',
				'ȅ': 'e',
				'ȇ': 'e',
				'ẹ': 'e',
				'ệ': 'e',
				'ḙ': 'e',
				'ḛ': 'e',
				'ɇ': 'e',
				'ᶒ': 'e',
				
				'ḟ': 'f',
				'ƒ': 'f',
				'ᵮ': 'f',
				'ᶂ': 'f',
				
				'ǵ': 'g',
				'ğ': 'g',
				'ĝ': 'g',
				'ǧ': 'g',
				'ġ': 'g',
				'ģ': 'g',
				'ḡ': 'g',
				'ǥ': 'g',
				'ɠ': 'g',
				'ᶃ': 'g',
				
				'ĥ': 'h',
				'ȟ': 'h',
				'ḧ': 'h',
				'ḣ': 'h',
				'ḩ': 'h',
				'ḥ': 'h',
				'ḫ': 'h',
				'ẖ': 'h',
				'ħ': 'h',
				'ⱨ': 'h',

				'ĭ': 'i',
				'ǐ': 'i',
				'ḯ': 'i',
				'į': 'i',
				'ī': 'i',
				'ỉ': 'i',
				'ȉ': 'i',
				'ȋ': 'i',
				'ị': 'i',
				'ḭ': 'i',
				'ɨ': 'i',
				'ᵻ': 'i',
				'ᶖ': 'i',
				'i': 'i',
				'ı': 'i',
				
				'ĵ': 'j',
				'ɉ': 'j',
				'ǰ': 'j',
				'ȷ': 'j',
				'ʝ': 'j',
				'ɟ': 'j',
				'ʄ': 'j',
				
				'ḱ': 'k',
				'ǩ': 'k',
				'ķ': 'k',
				'ḳ': 'k',
				'ḵ': 'k',
				'ƙ': 'k',
				'ⱪ': 'k',
				'ᶄ': 'k',
				
				'ĺ': 'l',
				'ľ': 'l',
				'ļ': 'l',
				'ḷ': 'l',
				'ḹ': 'l',
				'ḽ': 'l',
				'ḻ': 'l',
				'ł': 'l',
				'ŀ': 'l',
				'ƚ': 'l',
				'ⱡ': 'l',
				'ɫ': 'l',
				'ɬ': 'l',
				'ᶅ': 'l',
				'ɭ': 'l',
				'ȴ': 'l',
				
				'ḿ': 'm',
				'ṁ': 'm',
				'ṃ': 'm',
				'ᵯ': 'm',
				'ᶆ': 'm',
				'ɱ': 'm',
				
				'ń': 'n',
				'ǹ': 'n',
				'ň': 'n',
				'ñ': 'n',
				'ṅ': 'n',
				'ņ': 'n',
				'ṇ': 'n',
				'ṋ': 'n',
				'ṉ': 'n',
				'n̈': 'n',
				'ɲ': 'n',
				'ƞ': 'n',
				'ŋ': 'n',
				'ᵰ': 'n',
				'ᶇ': 'n',
				'ɳ': 'n',
				'ȵ': 'n',
				
				'ŏ': 'o',
				'ố': 'o',
				'ồ': 'o',
				'ỗ': 'o',
				'ổ': 'o',
				'ǒ': 'o',
				'ȫ': 'o',
				'ő': 'o',
				'ṍ': 'o',
				'ṏ': 'o',
				'ȭ': 'o',
				'ȯ': 'o',
				'͘o͘': 'o',
				'ȱ': 'o',
				'ø': 'o',
				'ǿ': 'o',
				'ǫ': 'o',
				'ǭ': 'o',
				'ō': 'o',
				'ṓ': 'o',
				'ṑ': 'o',
				'ỏ': 'o',
				'ȍ': 'o',
				'ȏ': 'o',
				'ơ': 'o',
				'ớ': 'o',
				'ờ': 'o',
				'ỡ': 'o',
				'ở': 'o',
				'ợ': 'o',
				'ọ': 'o',
				'ộ': 'o',
				'ɵ': 'o',
				'ɔ': 'o',
				
				'ṕ': 'p',
				'ṗ': 'p',
				'ᵽ': 'p',
				'ƥ': 'p',
				'p̃': 'p',
				'ᵱ': 'p',
				'ᶈ': 'p',
				
				'ɋ': 'q',
				'ƣ': 'q',
				'ʠ': 'q',
				
				'ŕ': 'r',
				'ř': 'r',
				'ṙ': 'r',
				'ŗ': 'r',
				'ȑ': 'r',
				'ȓ': 'r',
				'ṛ': 'r',
				'ṝ': 'r',
				'ṟ': 'r',
				'ɍ': 'r',
				'ɽ': 'r',
				'ᵲ': 'r',
				'ᶉ': 'r',
				'ɼ': 'r',
				'ɾ': 'r',
				'ᵳ': 'r',
				
				'ś': 's',
				'ṥ': 's',
				'ŝ': 's',
				'š': 's',
				'ṧ': 's',
				'ṡẛ': 's',
				'ş': 's',
				'ṣ': 's',
				'ṩ': 's',
				'ș': 's',
				's̩': 's',
				'ᵴ': 's',
				'ᶊ': 's',
				'ʂ': 's',
				'ȿ': 's',
				'г': 's',
				
				'ť': 't',
				'ṫ': 't',
				'ţ': 't',
				'ṭ': 't',
				'ț': 't',
				'ṱ': 't',
				'ṯ': 't',
				'ŧ': 't',
				'ⱦ': 't',
				'ƭ': 't',
				'ʈ': 't',
				'̈ẗ': 't',
				'ᵵ': 't',
				'ƫ': 't',
				'ȶ': 't',
				
				'ŭ': 'u',
				'ǔ': 'u',
				'ů': 'u',
				'ǘ': 'u',
				'ǜ': 'u',
				'ǚ': 'u',
				'ǖ': 'u',
				'ű': 'u',
				'ṹ': 'u',
				'ų': 'u',
				'ū': 'u',
				'ṻ': 'u',
				'ủ': 'u',
				'ȕ': 'u',
				'ȗ': 'u',
				'ư': 'u',
				'ứ': 'u',
				'ừ': 'u',
				'ữ': 'u',
				'ử': 'u',
				'ự': 'u',
				'ụ': 'u',
				'ṳ': 'u',
				'ṷ': 'u',
				'ṵ': 'u',
				'ʉ': 'u',
				'ᵾ': 'u',
				'ᶙ': 'u',
				
				'ṽ': 'v',
				'ṿ': 'v',
				'ʋ': 'v',
				'ᶌ': 'v',
				'ⱴ': 'v',
				
				'ẃ': 'w',
				'ẁ': 'w',
				'ŵ': 'w',
				'ẅ': 'w',
				'ẇ': 'w',
				'ẉ': 'w',
				'ẘ': 'w',
				
				'ẍ': 'x',
				'ẋ': 'x',
				'ᶍ': 'x',
				
				'ý': 'y',
				'ỳ': 'y',
				'ŷ': 'y',
				'ẙ': 'y',
				'ÿ': 'y',
				'ỹ': 'y',
				'ẏ': 'y',
				'ȳ': 'y',
				'ỷ': 'y',
				'ỵ': 'y',
				'ɏ': 'y',
				'ƴ': 'y',
				'ʏ': 'y',
				
				'ź': 'z',
				'ẑ': 'z',
				'ž': 'z',
				'ż': 'z',
				'ẓ': 'z',
				'ẕ': 'z',
				'ƶ': 'z',
				'ȥ': 'z',
				'ⱬ': 'z',
				'ᵶ': 'z',
				'ᶎ': 'z',
				'ʐ': 'z',
				'ʑ': 'z',
				'ɀ': 'z',

				// greek
				'α': 'a',
				'β': 'b',
				'γ': 'g',
				'ɣ': 'g',
				'δ': 'd',
				'ð': 'd',
				'ε': 'e',
				'ζ': 'z',
				'η': 'i',
				'θ': 'th',
				'ι': 'i',
				'κ': 'k',
				'λ': 'l',
				'μ': 'm',
				'µ': 'm',
				'ν': 'n',
				'ξ': 'x',
				'ο': 'o',
				'π': 'p',
				'ρ': 'r',
				'σ': 's',
				'ς': 's',
				'τ': 't',
				'υ': 'u', // official rule: if preceeded by 'α' OR 'ε' => 'v', by 'ο' => 'u', else => 'i'
				'φ': 'f',
				'χ': 'ch',
				'ψ': 'ps',
				'ω': 'o',

				// greek diacritics
				'ᾳ': 'a',
				'ά': 'a',
				'ὰ': 'a',
				'ᾴ': 'a',
				'ᾲ': 'a',
				'ᾶ': 'a',
				'ᾷ': 'a',
				'ἀ': 'a',
				'ᾀ': 'a',
				'ἄ': 'a',
				'ᾄ': 'a',
				'ἂ': 'a',
				'ᾂ': 'a',
				'ἆ': 'a',
				'ᾆ': 'a',
				'ἁ': 'a',
				'ᾁ': 'a',
				'ἅ': 'a',
				'ᾅ': 'a',
				'ἃ': 'a',
				'ᾃ': 'a',
				'ἇ': 'a',
				'ᾇ': 'a',
				'ᾱ': 'a',
				'ᾰ': 'a',

				'έ': 'e',
				'ὲ': 'e',
				'ἐ': 'e',
				'ἔ': 'e',
				'ἒ': 'e',
				'ἑ': 'e',
				'ἕ': 'e',
				'ἓ': 'e',

				'ῃ': 'i',
				'ή': 'i',
				'ὴ': 'i',
				'ῄ': 'i',
				'ῂ': 'i',
				'ῆ': 'i',
				'ῇ': 'i',
				'ἠ': 'i',
				'ᾐ': 'i',
				'ἤ': 'i',
				'ᾔ': 'i',
				'ἢ': 'i',
				'ᾒ': 'i',
				'ἦ': 'i',
				'ᾖ': 'i',
				'ἡ': 'i',
				'ᾑ': 'i',
				'ἥ': 'i',
				'ᾕ': 'i',
				'ἣ': 'i',
				'ᾓ': 'i',
				'ἧ': 'i',
				'ᾗ': 'i',

				'ί': 'i',
				'ὶ': 'i',
				'ῖ': 'i',
				'ἰ': 'i',
				'ἴ': 'i',
				'ἲ': 'i',
				'ἶ': 'i',
				'ἱ': 'i',
				'ἵ': 'i',
				'ἳ': 'i',
				'ἷ': 'i',
				'ϊ': 'i',
				'ΐ': 'i',
				'ῒ': 'i',
				'ῗ': 'i',
				'ῑ': 'i',
				'ῐ': 'i',

				'ό': 'o',
				'ὸ': 'o',
				'ὀ': 'o',
				'ὄ': 'o',
				'ὂ': 'o',
				'ὁ': 'o',
				'ὅ': 'o',
				'ὃ': 'o',

				'ύ': 'u',
				'ὺ': 'u',
				'ῦ': 'u',
				'ὐ': 'u',
				'ὔ': 'u',
				'ὒ': 'u',
				'ὖ': 'u',
				'ὑ': 'u',
				'ὕ': 'u',
				'ὓ': 'u',
				'ὗ': 'u',
				'ϋ': 'u',
				'ΰ': 'u',
				'ῢ': 'u',
				'ῧ': 'u',
				'ῡ': 'u',
				'ῠ': 'u',

				'ῳ': 'o',
				'ώ': 'o',
				'ῴ': 'o',
				'ὼ': 'o',
				'ῲ': 'o',
				'ῶ': 'o',
				'ῷ': 'o',
				'ὠ': 'o',
				'ᾠ': 'o',
				'ὤ': 'o',
				'ᾤ': 'o',
				'ὢ': 'o',
				'ᾢ': 'o',
				'ὦ': 'o',
				'ᾦ': 'o',
				'ὡ': 'o',
				'ᾡ': 'o',
				'ὥ': 'o',
				'ᾥ': 'o',
				'ὣ': 'o',
				'ᾣ': 'o',
				'ὧ': 'o',
				'ᾧ': 'o',

				'ῤ': 'r',
				'ῥ': 'r',

				// cyrillic (russian)
				'а': 'a',
				'б': 'b',
				'в': 'v',
				'г': 'g',
				'д': 'd',
				'е': 'e',
				'ё': 'e',
				'ж': 'zh',
				'з': 'z',
				'и': 'i',
				'й': 'j',
				'к': 'k',
				'л': 'l',
				'м': 'm',
				'н': 'n',
				'о': 'o',
				'п': 'p',
				'р': 'r',
				'с': 's',
				'т': 't',
				'у': 'u',
				'ф': 'f',
				'х': 'h',
				'ц': 'ts',
				'ч': 'ch',
				'ш': 'sh',
				'щ': 'sh',
				'ъ': '',
				'ы': 'i',
				'ь': '',
				'э': 'e',
				'ю': 'yu',
				'я': 'ya',
				// ---
				'і': 'j',
				'ѳ': 'f',
				'ѣ': 'e',
				'ѵ': 'i',
				'ѕ': 'z',
				'ѯ': 'ks',
				'ѱ': 'ps',
				'ѡ': 'o',
				'ѫ': 'yu',
				'ѧ': 'ya',
				'ѭ': 'yu',
				'ѩ': 'ya',

				// currency
				'₳': 'ARA',
				'฿': 'THB',
				'₵': 'GHS',
				'¢': 'c',
				'₡': 'CRC',
				'₢': 'Cr',
				'₠': 'XEU',
				'$': 'USD',
				'₫': 'VND',
				'৳': 'BDT',
				'₯': 'GRD',
				'€': 'EUR',
				'₣': 'FRF',
				'₲': 'PYG',
				'₴': 'HRN',
				'₭': 'LAK',
				'₦': 'NGN',
				'₧': 'ESP',
				'₱': 'PhP',
				'£': 'GBP',
				'₤': 'GBP',
				'₨': 'Rs',
				'₪': 'NS',
				'₮': 'MNT',
				'₩': 'WON',
				'¥': 'YEN',
				'៛': 'KHR',
				
				// separators
				'–': delimiter,
				'—': delimiter,
				'―': delimiter,
				'~': delimiter,
				'/': delimiter,
				'\\': delimiter,
				'|': delimiter,
				'+': delimiter,
				'‘': delimiter,
				'’': delimiter,
				'\'': delimiter,
				' ': delimiter,

				// permitted by default but can be overridden
				'-': '-',
				'_': '_'
			};

		// add any user-defined separator elements
		if (separators) {
			for (i; i >= 0; --i) {
				sanitizer[separators[i]] = delimiter;
			}
		}

		// do all the replacements
		slug = slug.toLowerCase(); // if we don't do this, add the uppercase versions to the sanitizer plus inlcude A-Z in the prohibited filter
		slug = slug.replace(prohibited, function (match) { return sanitizer[match] || ''; });
		slug = slug.replace(consecutive, delimiter);
		slug = slug.replace(trim, "$1");

		return slug;
	}
}

exports.startsWith = function () {
	return function (haystack, needle, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "startsWith" needs 2 parameters');
		}

		//make sure we have strings
		haystack = ''+haystack;
		needle = ''+needle;

		var result = haystack.substr(0,needle.length) === needle;

		if (!options.fn) {
			return result;
		}

		return result ? options.fn(this) : options.inverse(this);
	};
};

exports.truncate = function () {
	return function (input, length, suffix, options) {
		options = arguments[arguments.length - 1];

		var hashLength = options.hash && options.hash.length,
			hashSuffix = options.hash && options.hash.suffix;

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				throw new Error('Handlebars Helper "truncate" needs 2 parameters minimum');
			} else if (hashLength === undefined) {
				throw new Error('Handlebars Helper "truncate" needs a length');
			} else {
				input = options.fn(this);
				length = hashLength || 0;
				suffix = hashSuffix || '\u2026';
			}
			break;

		case 2:
			if (!options.fn) {
				if (hashLength === undefined) {
					throw new Error('Handlebars Helper "truncate" needs 2 parameters minimum');
				}
				length = hashLength;
			} else {
				input = options.fn(this);
				length = arguments[0];
				suffix = hashSuffix || '\u2026';
			}
			break;

		case 3:
			if (!options.fn) {
				suffix = hashSuffix || '\u2026';
			} else {
				input = options.fn(this);
				length = arguments[0];
				suffix = hashSuffix || '\u2026';
			}
			break;
		}

		//make sure we've got a string
		input = ''+input;

		if (length > input.length) {
			return input;
		}

		return input.substring(0, length - suffix.length).replace(/^\s+|\s+$/gm, '') + suffix;
	};
};

exports.ucfirst = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "ucfirst" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		if(input && typeof input === "string") {
			return input.charAt(0).toUpperCase() + input.slice(1);
		} else {
			return '';
		}
	};
};

exports.ucsentences = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "ucwords" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		if(input && typeof input === "string") {
			return input.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		} else {
			return '';
		}
	};
};

exports.ucwords = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "ucwords" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		if(input && typeof input === "string") {
			return input.replace(/\w\S*/g, function (word) {
				return word.charAt(0).toUpperCase() + word.substr(1);
			});
		} else {
			return '';
		}
	};
};

exports.uppercase = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "uppercase" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		return (''+input).toUpperCase();
	};
};

exports.urldecode = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 2) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "urldecode" needs 1 parameter minimum');
			}

			input = options.fn(this);
		}

		return decodeURIComponent(input);

	};
};

exports.urlencode = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 2) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "urlencode" needs 1 parameter minimum');
			}
			
			input = options.fn(this);
		}

		return encodeURIComponent(input);

	};
};

	return exports;
})();


hoard.load = function (Handlebars) {
	var args = [],
		i = 0,
		c,
		helper;

	(function descend(level) {
		if (Array.isArray(level)) {
			level.forEach(descend);
		} else {
			args.push(level);
		}
	})([].slice.call(arguments, 1));

	c = args.length;

	// if no helpers were defined, load all of them.
	if (!c) {
		args = Object.keys(hoard.helpers);
		c = args.length;
	}

	for (;i < c; i++) {
		helper = hoard.helpers[args[i]].call(context, Handlebars);
		Handlebars.registerHelper(args[i], helper);
	}
};


if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
	//Running inside node
	module.exports = hoard;

} else if ( typeof define === 'function' && define.amd ) {
	//Running inside an AMD loader
	define([], function () {return hoard;});
	
} else {
	//Dunno where we are, add it to the global context with a noConflict

	var previous = context.HelperHoard;
	hoard.noConflict = function () {
		context.HelperHoard = previous;
		return hoard;
	};
	context.HelperHoard = hoard;

}

})(this);