
exports.date = function () {
	var moment = require && require('moment') || this.moment;
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			input = moment();
		} else {
			input = moment(input, options.hash && options.hash.parse || undefined);
		}

		if (!input.isValid()) {
			if (options.inverse) {
				return options.inverse(this);
			} else {
				return '';
			}
		}

		var format = 'YYYY-MM-DD';
		if (options.hash && options.hash.format) {
			format = options.hash.format;
		}
		if (options.fn) {
			format = options.fn(this);
		}

		return input.format(format);
	};
};
