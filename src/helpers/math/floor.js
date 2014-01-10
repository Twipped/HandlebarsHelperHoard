
exports.floor = function () {
	return function (value, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "floor" needs 1 parameter minimum');
		}

		return Math.floor(value);
		
	};
};