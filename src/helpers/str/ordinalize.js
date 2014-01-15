
exports.ordinalize = function (Handlebars) {
	return function (value) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ordinalize" needs 1 parameter');
		}

		var normal = Math.abs(Math.round(value));
		if ([11, 12, 13].indexOf(normal % 100) >= 0) {
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