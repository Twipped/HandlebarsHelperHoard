
exports.default = function () {

	function truthy (value) {
		if (Array.isArray(value)) return value.length && value;
		return value;
	}

	return function (value, fallback, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "default" needs 2 parameters');
		}

		return truthy(value) || fallback;
	};
};