
exports.humanNumber = function () {
	return function (number, digits) {
		if (arguments.length < 1) {
			throw new Error('Handlebars Helper "numberAbbr" needs 1 parameter minimum');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2 || digits === undefined) {
			digits = 2;
		}

		digits = Math.pow(10, digits);

		var abbr = ["k", "m", "b", "t"];

		var i = abbr.length - 1;

		while (i >= 0) {
			var size = Math.pow(10, (i + 1) * 3);
			if (size <= number) {
				number = Math.round(number * digits / size) / digits;

				// Special case where we round up to the next abbreviation
				if ((number === 1000) && (i < abbr.length - 1)) {
					number = 1;
					i++;
				}
				
				number += abbr[i];
				break;
			}
			i--;
		}
		return number;
	};
};