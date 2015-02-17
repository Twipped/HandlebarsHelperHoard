
exports.length = function () {
	/**
	 * Returns the number of keys on an object, or the length of an array or string.
	 * May be used inline or as an iterator. Else condition evaluates if result is 0.
	 *
	 * @category collections
	 *
	 * @signature {{length input}}
	 * @describe Returns the length of the input
	 * @param {array|object|string} input
	 * @return {integer}
	 *
	 * @signature {{length input target}}
	 * @descibe Returns a boolean if the length matches the passed target.
	 * @param {array|object|string} input
	 * @param {integer} target The target length to check against
	 * @return {boolean}
	 *
	 * @signature {{#length input target}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/length}}
	 * @describe Evaluates block content if the length is greater than 0, else if it is not.
	 * @param {array|object|string} input
	 *
	 * @signature {{#length input target}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/length}}
	 * @describe Evaluates block content if the length matches the target, else block if it does not
	 * @param {array|object|string} input
	 * @param {interger} target The target length it should match in order to evaluate.
	 */
	return function length (input, target, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "length" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			target = false;
		}

		var results;
		if (input.length !== undefined) {
			results = input.length;
		} else if (typeof input === 'object') {
			results = Object.keys(input).length;
		} else {
			results = !!input;
		}

		if (!options.fn) return target === false ? results : results === target && target || 0;

		if (target === false ? results : results === target) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
	/***/
};
