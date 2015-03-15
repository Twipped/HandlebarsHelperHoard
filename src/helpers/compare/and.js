
exports.and = function () {

	function truthy (value) {
		if (Array.isArray(value)) return value.length && value;
		return value;
	}

	/**
	 * Tests if all of the passed arguments are truthy.
	 * Empty arrays are counted as falsy.
	 * May be used inline or as a conditional block.
	 * @category comparisons
	 *
	 * @signature {{and arg1 [... argN]}}
	 * @param {mixed} [argN] Some value to be checked for truthiness
	 * @return {mixed} Returns the first last argument, or first falsy value.
	 *
	 * @signature {{#and arg1 [... argN]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/and}}
	 * @describe Truthy block will evaluate with the result value as the current context ({this}).
	 * @param {mixed} [argN] Some value to be checked for truthiness
	 */

	return function and (a, options) {
		var args = [].slice.call(arguments, 1);
		options = args.pop();

		var i = 0, c = args.length, result = a;
		for (; i < c; i++) {
			result = result && truthy(args[i]);
			if (!result) break;
		}

		if (!options.fn) return result;

		if (result) {
			return options.fn(result);
		} else {
			return options.inverse(this);
		}
	};

	/***/
};
