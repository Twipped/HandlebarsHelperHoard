
exports.round = function () {
	return function (value) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "round" needs 1 parameter minimum');
		}

		return Math.round(value);
	};
};
