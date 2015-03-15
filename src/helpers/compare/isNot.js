
exports.isNot = function () {

	/**
	 * Tests that the first argument does not match any of the other arguments with strict equality.
	 * @category comparisons
	 *
	 * @signature {{isNot value test1 ... testN}}
	 * @param  {mixed} value Value to check against
	 * @param  {mixed} ...test Values to test
	 * @return {mixed} Matched value
	 *
	 * @signature {{#isNot value test1 ... testN}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/isNot}}
	 */
	
	return function isNot (value, test, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "isNot" needs a minimum of 2 arguments');
		}

		var args = [].slice.call(arguments);
		
		options = args.pop();
		value = args.shift();

		var result = args.indexOf(value) === -1;

		if (!options.fn) return result || '';

		return result ? options.fn(this) : options.inverse(this);
	};

	/***/
};
