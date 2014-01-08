
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