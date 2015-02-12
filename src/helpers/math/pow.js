
exports.pow = function () {
	return function (valueA, valueB) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "pow" needs 2 parameters minimum');
		}

		return Math.pow(valueA, valueB);
	};
};
