
exports.add = function () {
	return function (valueA, valueB) {
		if (arguments.length <= 1) {
			throw new Error('Handlebars Helper "block" needs 1 parameter minimum');
		}

		var value = 0;

		//with the arguments array as an entry point, descend into any sub-arrays for values to add to the total.
		(function descend(level) {
			if (Array.isArray(level)) {
				level.forEach(descend);
			} else {
				value += parseInt(level, 10);
			}
		})([].slice.call(arguments, 0, arguments.length - 1));

		return value;
		
	};
};