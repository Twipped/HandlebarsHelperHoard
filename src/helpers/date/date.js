
exports.date = function () {

	/**
	 * Outputs a date formatted using moment notation.
	 * Depends on the `moment` library. Moment will be searched for by first accessing a `require` function (if present) before checking global contexts.
	 * @category date
	 * @name date
	 *
	 * @signature {{date format}}
	 * @describe Outputs the current date/time
	 * @param  {string} format  Moment formatting
	 * @return {string}
	 *
	 * @signature {{date format input [parse=<string>]}}
	 * @param  {string} format  Moment formatting
	 * @param  {string|Date} input   The date value to be formatted. Must be either a Date object, parsable by Date(input), or parsable using a providing parsing string.
	 * @param {string} [parse] If a `parse` attribute is provided, it will be used for instructing moment on how to parse the input.
	 * @return {string}
	 */
	
	return function date (format, input, options) {
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

	/***/
};

exports.date.needs = ['moment'];
