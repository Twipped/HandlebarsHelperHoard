
exports.stringify = function (Handlebars) {

	/**
	 * Converts the passed value into JSON.
	 * Does not support block syntax.
	 * @category data
	 * @name stringify
	 *
	 * @signature {{stringify input [pretty]}}
	 * @param  {mixed} input    Value to be stringified
	 * @param  {boolean} pretty Controls if the json should be tab indented.
	 * @return {string} The formatted JSON.
	 */
	
	return function stringify (input, pretty, options) {

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "stringify" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			pretty = undefined;
		} else {
			if (pretty && typeof pretty !== 'string') {
				pretty = '  ';
			}
		}

		return new Handlebars.SafeString(JSON.stringify(input, undefined, pretty));
	};

	/***/
};
