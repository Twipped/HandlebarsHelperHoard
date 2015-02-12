var glob = require('glob');
var path = require('path');
var fs = require('fs');
var async = require('async');
var extend = require('util')._extend;
var declare = require('nsdeclare');
var uglify = require("uglify-js");

var src = path.resolve(__dirname, './src');

var groups = {
	nonbrowser: [],
	nonnode: [],
	nodeps: []
};
var helpers = {};

var files = glob.sync('helpers/**/*.js', {cwd: src}).map(function (f) {
	f = path.join(src, f);
	var o = require(f);
	var name = Object.keys(o)[0];
	var group = path.basename(path.dirname(f));

	var helper = {
		name: name,
		group: group,
		path: f,
		nodeSafe: !o[name].noNode,
		browserSafe: !o[name].noBrowser,
	};

	if (!groups[group + '-group']) groups[group + '-group'] = [];
	groups[group + '-group'].push(helper);

	if (!helper.browserSafe) groups.nonbrowser.push(helper);
	if (!helper.nodeSafe) groups.nonnode.push(helper);

	if (o[name].needs) o[name].needs.forEach(function (needs) {
		var g = needs + '-dependency';
		if (!groups[g]) groups[g] = [];
		groups[g].push(helper);
	});
	else groups.nodeps.push(helper);

	helpers[name] = helper;

	return helper;
});

groups['all-group'] = files;

function build (options, callback) {
	options = extend({
		flags: [],
		output: null,
		minify: false,
		commonjs: true,
		amd: true,
		namespace: 'HelperHoard'
	}, options || {});

	var included = [];

	function add (helper) {
		if (Array.isArray(helper)) return helper.forEach(add);

		if (typeof helper === 'string') {
			if (groups[helper]) return add(groups[helper]);
			else if (helpers[helper]) return add(helpers[helper]);
		}

		if (helper && typeof helper === 'object' && helper.path) {
			included.push(helper);
			return;
		}
	}

	function remove (helper) {
		if (Array.isArray(helper)) return helper.forEach(remove);

		if (typeof helper === 'string') {
			if (groups[helper]) return remove(groups[helper]);
			else if (helpers[helper]) return remove(helpers[helper]);
		}

		var i;
		while (true) {
			i = included.indexOf(helper);
			if (i === -1) break;
			included.splice(i, 1);
		}
	}

	if (options.flags && options.flags.length) {
		options.flags.forEach(function (flag) {
			var delta = true;
			if (flag[0] === '-') {
				delta = false;
				flag = flag.substr(1);
			} else if (flag[0] === '+') {
				flag = flag.substr(1);
			}

			// if we've not added anything yet (meaning first flag)
			// and this is a remove, add all to included so that we have
			// something to remove from.
			if (!included.length && !delta) {
				included = groups['all-group'].concat();
			}

			if (delta) add(flag);
			else remove(flag);
		});
	} else {
		included = groups['all-group'].concat();
	}

	included = included.map(function (f) {
		return f.path;
	});

	included.unshift(path.join(src, 'intro.js'));
	included.push(path.join(src, 'loader.js'));

	async.map(included, function (item, done) {
		fs.readFile(item, 'utf8', done);
	}, function (err, contents) {
		if (err) return callback(err);
		
		contents.splice(1, 0, "(function (exports) {");

		if (options.flags) {
			contents.splice(1, 0, "/* Custom Build: helper-hoard -i '" + options.flags.join(' ') + "' */");
		}

		if (options.commonjs) {
			contents.push("//CommonJS Loader\nif ( typeof module === 'object' && module && typeof module.exports === 'object' ) {module.exports = load;}\n");
		}

		if (options.amd) {
			contents.push("//AMD Loader\nif ( typeof define === 'function' && define.amd ) {define(function () { return load; });}\n");
		}

		if (options.namespace) {
			var namespace = declare(options.namespace, { value: "load", root: 'context', response: 'details' });

			contents.push('//Global Namespace\nvar previous, context = (typeof window !== "undefined" && window) || (typeof global !== "undefined" && global) || this;');
			contents.push('if (context) {');
			contents.push('    previous = ' + namespace.namespace + ';');
			contents.push('    ' + namespace.declaration);
			contents.push('    load.noConflict = function () {' + namespace.namespace + ' = previous;return load;};');
			contents.push('}\n');
		}

		contents.push('})({});');

		var result = contents.join('\n');

		if (options.minify) {
			result = uglify.minify(result, {fromString: true, warnings: true}).code;
			result = contents[0] + '\n' + result;
		}

		if (options.output) {
			fs.writeFile(options.output, result, callback);
		} else if (callback) {
			callback(null, result);
		} else {
			process.stdout.write(result);
		}
	});

}

module.exports = build;
module.exports.groups = Object.keys(groups);
module.exports.helpers = Object.keys(helpers);