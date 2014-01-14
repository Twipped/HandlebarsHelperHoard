
exports.fromNow = function () {
	return function (input, options) {
		var moment = require && require('moment') || this.moment;
		if (!moment) {
			throw new Error('Handlebars Helper "date" requires that the Moment.js library be loaded before using in a template.');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "fromNow" needs 1 parameter');
		} else {
			input = moment(input, options.hash && options.hash.parse || undefined);
		}

		if (!input.isValid()) {
			return '';
		}

		return input.fromNow();
	};
};
