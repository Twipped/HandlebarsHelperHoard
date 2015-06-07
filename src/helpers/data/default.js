
exports.default = function () {

	function truthy (value) {
		if (Array.isArray(value)) return value.length && value;
		return value;
	}

	/**
	 * Outputs a fallback value if the first argument is falsy.
	 * @category data
	 * @name default
	 *
	 * @signature {{default value fallback}}
	 * @param  {mixed} value
	 * @param  {mixed} fallback
	 * @return {mixed}
	 *
	 * @signature {{#default value fallback}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/default}}
	 */
	
	return function (value, fallback, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length !== 3) {
			throw new Error('Handlebars Helper "default" needs 2 parameters');
		}

		return truthy(value) || fallback;
	};
};