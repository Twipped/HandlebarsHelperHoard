
exports.date = function () {
	return function (format, input, options) {
		var moment = (typeof require === 'function' && require('moment')) || ((typeof window !== 'undefined' && window) || (typeof global !== 'undefined' && global) || {}).moment;
		if (!moment) {
			throw new Error('Handlebars Helper "date" requires that the Moment.js library be loaded before using in a template.');
		}

		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			format = 'YYYY-MM-DD HH:mm:ss';
			input = moment();
			break;
		case 2:
			input = moment();
			break;
		case 3:
			var parse = options.hash && options.hash.parse || undefined;
			if (parse) {
				input = moment(input, parse);
			} else {
				input = moment(new Date(input));
			}
			break;
		}

		if (!input.isValid()) {
			return '';
		}

		return input.format(format);
	};
};

exports.date.needs = ['moment'];
