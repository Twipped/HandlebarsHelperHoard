
exports.empty = function () {
	/**
	 * Tests if the provided input is empty (string, array or object)
	 * May be used inline or as a conditional block.
	 *
	 * @category collections
	 * @signature {{empty input}}
	 * @param  {string|array|object} input
	 * @return {boolean}
	 *
	 * @signature {{#empty input}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/empty}}
	 * @param  {string|array|object} input
	 * @example
	 * // items = ['a']
	 * {{#empty items}}is empty{{else}}is not empty{{/empty}}
	 * // Result: 'is not empty'
	 */
	return function empty (input, options) {
		var yes = false;
		if (Array.isArray(input)) {
			yes = input.length <= 0;
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = keys.length <= 0;
		} else {
			yes = !input;
		}

		if (!options.fn) {
			return yes || '';
		} else {
			return yes ? options.fn(this) : options.inverse(this);
		}
	};
	/***/
};
