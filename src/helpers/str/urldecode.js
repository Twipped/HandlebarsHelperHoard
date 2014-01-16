
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