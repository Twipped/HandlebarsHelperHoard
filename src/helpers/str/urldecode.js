
exports.urldecode = function () {
	return function (input, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "urldecode" needs 1 parameter minimum');
		}

		return decodeURIComponent(uri);

	};
};