
exports.gt = function () {

	/**
	 * Tests if the first argument is greater than the second argument.
	 * May be used inline or as a conditional block.
	 * @category comparisons
	 *
	 * @signature {{gt value test}}
	 * @param  {string|integer} value Greater value
	 * @param  {string|integer} test  Smaller value
	 * @return {boolean}
	 *
	 * @signature {{#gt value test}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/gt}}
	 */
	
	return function gt (value, test, options) {
		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "gt" needs 2 parameters');
		}
		
		if (!options.fn) return value > test || '';
		if (value > test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

	/***/
};