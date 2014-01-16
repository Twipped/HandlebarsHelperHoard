
exports.ucfirst = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "ucfirst" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		if(input && typeof input === "string") {
			return input.charAt(0).toUpperCase() + input.slice(1);
		} else {
			return '';
		}
	};
};