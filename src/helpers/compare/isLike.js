
exports.isLike = function () {

	/**
	 * Tests if the first argument matches any of the other arguments with loose equality.
	 * @category comparisons
	 *
	 * @signature {{isLike value test1 ... testN}}
	 * @param  {mixed} value Value to check against
	 * @param  {mixed} ...test Values to test
	 * @return {mixed} Matched value
	 *
	 * @signature {{#isLike value test1 ... testN}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/isLike}}
	 * @describe Truthy block will evaluate with the result value as the current context ({this}).
	 */
	
	return function isLike (value, test, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "isLike" needs a minimum of 2 arguments');
		}

		var args = [].slice.call(arguments);
		
		options = args.pop();
		value = args.shift();

		var result = false;
		var i = args.length;
		while (i-- && !result) {
			result = result || (value == args[i]);
		}

		if (!options.fn) return result || '';
		
		return result ? options.fn(this) : options.inverse(this);
	};

	/***/
};
