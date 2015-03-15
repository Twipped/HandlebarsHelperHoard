
exports.notEmpty = function () {
	/**
	 * Opposite of {{empty}}
	 *
	 * @category collections
	 * @signature {{notEmpty input}}
	 * @param  {string|array|object} input
	 * @return {boolean}
	 *
	 * @signature {{#notEmpty input}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/notEmpty}}
	 * @example
	 * // items = ['a']
	 * {{#notEmpty items}}is not empty{{else}}is empty{{/notEmpty}}
	 * // Result: 'is not empty'
	 */
	return function notEmpty (input, options) {
		var yes = false;
		if (Array.isArray(input)) {
			yes = input.length > 0;
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = keys.length > 0;
		} else {
			yes = !!input;
		}

		if (!options.fn) {
			return yes || '';
		} else {
			return yes ? options.fn(this) : options.inverse(this);
		}
	};
	/***/
};
