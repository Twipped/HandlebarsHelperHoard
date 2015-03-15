
exports.isNotLike = function () {

	/**
	 * Tests that the first argument does not match any of the other arguments with loose equality.
	 * @category comparisons
	 *
	 * @signature {{isNotLike value test1 ... testN}}
	 * @param  {mixed} value Value to check against
	 * @param  {mixed} ...test Values to test
	 * @return {mixed} Matched value
	 *
	 * @signature {{#isNotLike value test1 ... testN}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/isNotLike}}
	 */
	
	return function isNotLike (value, test, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "isNotLike" needs a minimum of 2 arguments');
		}

		var args = [].slice.call(arguments);
		
		options = args.pop();
		value = args.shift();

		var result = true;
		var i = args.length;
		while (i-- && result) {
			result = result && (value != args[i]);
		}

		if (!options.fn) return result || '';
		
		return result ? options.fn(this, options) : options.inverse(this, options);
	};

	/***/
};