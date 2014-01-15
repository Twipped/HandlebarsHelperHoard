
exports.random = function () {
	return function (low, high, options) {
		switch (arguments.length) {
		case 1:
			return Math.random();
		case 2:
			low = 0;
			high = arguments[0];
			break;
		}

		return Math.floor(Math.random()*(high-low)+low);
		
	};
};