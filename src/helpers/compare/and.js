
exports.and = function () {
	return function (a, b, options) {

	function truthy (value) {
		if (Array.isArray(value)) return value.length && value;
		return value;
	}
		var args = [].slice.call(arguments, 1);
		options = args.pop();

		var i = 0, c = args.length, result = a;
		for (; i < c; i++) {
			result = result && truthy(args[i]);
			if (!result) break;
		}

		if (!options.fn) return result;

		if (result) {
			return options.fn(result);
		} else {
			return options.inverse(this);
		}
	};
};
