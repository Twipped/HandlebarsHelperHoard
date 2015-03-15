
exports.gte = function () {

	/**
	 * Tests if the first argument is greater than or equal to the second argument.
	 * May be used inline or as a conditional block.
	 * @category comparisons
	 *
	 * @signature {{gte value test}}
	 * @param  {string|integer} value Greater value
	 * @param  {string|integer} test  Smaller value
	 * @return {boolean}
	 *
	 * @signature {{#gte value test}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/gte}}
	 */
	
	return function gte (value, test, options) {
		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "gte" needs 2 parameters');
		}

		if (!options.fn) return value >= test || '';
		if (value >= test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

	/***/
};
