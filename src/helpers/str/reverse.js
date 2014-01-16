
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