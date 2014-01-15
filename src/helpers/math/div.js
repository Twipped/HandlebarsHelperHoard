
exports.div = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "div" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to divide the initial value by.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else if (level) {
					value = value / parseInt(level, 10);
				}			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};