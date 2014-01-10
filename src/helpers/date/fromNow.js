
exports.fromNow = function () {
	var moment = require && require('moment') || this.moment;
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "fromNow" needs 1 parameter');
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

		return input.fromNow();
	};
};
