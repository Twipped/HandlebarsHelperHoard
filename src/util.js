
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