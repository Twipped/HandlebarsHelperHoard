
exports.min = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "min" needs 1 parameter minimum');
		}

		options = arguments[arguments.length - 1];

		var value = valueA;

		//with the arguments array as an entry point, descend into any sub-arrays for values to min against
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				value = Math.max(value, parseInt(level, 10));
			}
		})([].slice.call(arguments, 1, arguments.length - 2));

		return value;
		
	};
};