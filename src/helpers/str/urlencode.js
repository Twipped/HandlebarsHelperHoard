
exports.urlencode = function () {
	return function (input, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "urlencode" needs 1 parameter minimum');
		}

		return encodeURIComponent(input);

	};
};