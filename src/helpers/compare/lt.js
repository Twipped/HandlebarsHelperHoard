
exports.lt = function () {

	/**
	 * Tests if the first argument is less than the second argument.
	 * May be used inline or as a conditional block.
	 * @category comparisons
	 *
	 * @signature {{lt value test}}
	 * @param  {string|integer} value Smaller value
	 * @param  {string|integer} test  Greater value
	 * @return {boolean}
	 *
	 * @signature {{#lt value test}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/lt}}
	 */
	
	return function lt (value, test, options) {
		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "lt" needs 2 parameters');
		}

		if (!options.fn) return value < test || '';
		if (value < test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

	/***/
};