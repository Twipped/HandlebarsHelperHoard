
exports.ceil = function () {
	return function (value, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "ceil" needs 1 parameter minimum');
		}

		return Math.ceil(value);
		
	};
};