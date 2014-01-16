
exports.lowercase = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "lowercase" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		return (''+input).toLowerCase();
	};
};