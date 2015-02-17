
exports.values = function (Handlebars) {
	/**
	 * Returns the values of an array or object.
	 * May be used inline or as an iterator. Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{values input}}
	 * @param  {array<mixed>|object} input
	 * @return {array<mixed>}
	 *
	 * @signature {{#values}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/values}}
	 */
	return function values (input, options) {
		if (!Array.isArray(input) && typeof input === 'object') {
			input = Object.keys(input).map(function (k) { return input[k]; });
		}

		if (!options.fn) {
			return input;
		} else {
			if (input.length) {
				var data = Handlebars.createFrame(options.data);
				return input.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === input.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
	/***/
};
