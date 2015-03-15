
exports.inArray = function () {
	/**
	 * Checks if a value exists in the passed array.
	 * May be used inline or as a conditional block.
	 *
	 * @category collections
	 * @signature {{inArray input value}}
	 * @param  {array<mixed>} input Array to search
	 * @param  {mixed} value Value to search for
	 * @return {boolean}
	 *
	 * @signature {{#inArray input value}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/inArray}}
	 */
	return function inArray (input, value, options) {
		var result = input.indexOf(value) >= 0;

		if (!options.fn) return result || '';
		
		return result ? options.fn(this) : options.inverse(this);
	};
	/***/
};
