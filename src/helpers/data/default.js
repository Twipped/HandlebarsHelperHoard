
exports.default = function () {
	return function (value, fallback, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "default" needs 2 parameters');
		}

		return value || fallback;
	};
};