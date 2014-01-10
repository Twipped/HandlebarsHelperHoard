
exports.ordinalize = function (Handlebars) {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ordinalize" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		var _ref;
		var normal = Math.abs(Math.round(value));
		if (_ref = normal % 100, _indexOf.call([11, 12, 13], _ref) >= 0) {
			return "" + value + "th";
		} else {
			switch (normal % 10) {
			case 1:
				return "" + value + "st";
			case 2:
				return "" + value + "nd";
			case 3:
				return "" + value + "rd";
			default:
				return "" + value + "th";
			}
		}
	};
};