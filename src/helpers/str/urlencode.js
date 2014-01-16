
exports.urlencode = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 2) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "urlencode" needs 1 parameter minimum');
			}
			
			input = options.fn(this);
		}

		return encodeURIComponent(input);

	};
};