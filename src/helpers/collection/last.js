
exports.last = function (Handlebars) {
	/**
	 * Returns the last N items in the passed array.
	 * May be used inline or as an iterator. Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{last input[ count]}}
	 * @param  {Array}  input Collection
	 * @param  {Number} [count] Number of items to exclude
	 * @return {Array} Array excluding the number of items specified
	 *
	 * @signature {{#last input[ count]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/last}}
	 * @example
	 * // items = ['a','b','c','d','e','f']
	 * {{#last items, 2}}<span>{{this}}</span>{{/last}}
	 * // Result: <span>a</span><span>b</span>
	 */
	return function last (input, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "last" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? input.slice(-count) : input[input.length - 1];
		} else {
			var results = count ? input.slice(-count) : [input[input.length - 1]];
			if (results.length) {
				var data = Handlebars.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}

	};
};
