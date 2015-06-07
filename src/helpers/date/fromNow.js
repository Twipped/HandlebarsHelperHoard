
exports.fromNow = function () {

	/**
	 * Outputs how much time has elapsed or will elapse between now and the passed date.
	 * Depends on the `moment` library. Moment will be searched for by first accessing a `require` function (if present) before checking global contexts.
	 * @category date
	 * @name fromNow
	 *
	 * @signature {{fromNow input [parse=<string>]}}
	 * @param  {string|Date} input   The date value to be formatted. Must be either a Date object, parsable by Date(input), or parsable using a providing parsing string.
	 * @param {string} [parse] If a `parse` attribute is provided, it will be used for instructing moment on how to parse the input.
	 * @return {string}
	 */
	
	return function fromNow (input, options) {
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

	/***/
};

exports.fromNow.needs = ['moment'];
