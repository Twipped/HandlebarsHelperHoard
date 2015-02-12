
exports.fromNow = function () {
	return function (input, options) {
		var moment = (typeof require === 'function' && require('moment')) || ((typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}).moment;
		if (!moment) {
			throw new Error('Handlebars Helper "date" requires that the Moment.js library be loaded before using in a template.');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "fromNow" needs 1 parameter');
		} else {
			var parse = options.hash && options.hash.parse || undefined;
			if (parse) {
				input = moment(input, parse);
			} else {
				input = moment(new Date(input));
			}
		}

		if (!input.isValid()) {
			return '';
		}

		return input.fromNow();
	};
};

exports.fromNow.needs = ['moment'];
