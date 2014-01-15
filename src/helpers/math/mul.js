
exports.mul = function () {
	return function (valueA, valueB, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "mul" needs 1 parameter minimum');
		}

		var value = 1;

		//with the arguments array as an entry point, descend into any sub-arrays for values to multiply the initial value by.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				value = value * parseInt(level, 10);
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};