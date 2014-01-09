
hhn.utils = {

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