
exports.lte = function () {

	/**
	 * Tests if the first argument is less than or equal to the second argument.
	 * May be used inline or as a conditional block.
	 * @category comparisons
	 *
	 * @signature {{lte value test}}
	 * @param  {string|integer} value Smaller value
	 * @param  {string|integer} test  Greater value
	 * @return {boolean}
	 *
	 * @signature {{#lte value test}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/lte}}
	 */
	
	return function lte (value, test, options) {
		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "lte" needs 2 parameters');
		}

		if (!options.fn) return value <= test || '';
		if (value <= test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

	/***/
};
