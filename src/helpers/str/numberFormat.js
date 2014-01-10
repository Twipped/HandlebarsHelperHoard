
exports.numberFormat = function () {
	return function (number, precision, decimalPoint, thousands) {
		// account for options argument
		var argc = arguments.length - 1;

		if (argc === 0) {
			throw new Error('Handlebars Helper "numberFormat" needs 1 parameter minimum');
		}

		if (argc === 3 || thousands === undefined) {
			thousands = ',';
		}

		if (argc === 2 || decimalPoint === undefined) {
			decimalPoint = '.';
		}

		if (argc === 1 || precision === undefined) {
			precision = 0;
		} else {
			precision = parseInt(precision, 10);
		}

		//strip any non-numeric characters
		number = ('' + number).replace(/[^0-9+\-Ee.]/g, '');

		var result;
		if (precision) {
			// round at the needed precision and then split on the decimal.
			var k = Math.pow(10, precision);
			result = ('' + Math.round(number * k) / k).split('.');

			// if no decimal existed, make sure we create a place for it.
			if (result.length === 1) result.push('');
		} else {
			// parse as float and round off, then store in an array to simplify below.
			result = [Math.round(parseFloat(number))];
		}

		//insert any thousands marks as needed
		if (thousands) {
			result[0] = ('' + result[0]).replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands);
		}

		// pad out the decimal places as needed
		if (precision && result[1].length < precision) {
			result[1] += new Array(precision - result[1].length + 1).join('0');
		}

		return precision ? result.join(decimalPoint) : result[0];
		
	};
};