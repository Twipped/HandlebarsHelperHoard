
/**
 * Or
 * Conditionally render a block if one of the values is truthy.
 */
exports.or = function () {
	return function (a, b, options) {

	function truthy (value) {
		if (Array.isArray(value)) {
			if (value.length) return true;
			else return false;
		}
		return !!value;
	}
		var args = [].slice.call(arguments);
		options = args.pop();

		var i = 0,
			c = args.length,
			result;


		for (; i < c; i++) {
			result = args[i];
			if (truthy(result)) {
				break;
			}
		}

		if (!options.fn) return result;

		if (truthy(result)) {
			return options.fn(result);
		} else {
			return options.inverse(this);
		}
	};
};