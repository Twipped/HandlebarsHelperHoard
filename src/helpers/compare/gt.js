
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