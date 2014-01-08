
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