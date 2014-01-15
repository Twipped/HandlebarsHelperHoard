
exports.max = function () {
	return function (valueA, valueB, options) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "max" needs 1 parameter minimum');
		}

		var value;

		//with the arguments array as an entry point, descend into any sub-arrays for values to min against
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				if (value === undefined) {
					value = parseInt(level, 10);
				} else {
					value = Math.max(value, parseInt(level, 10));
				}
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};