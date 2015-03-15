
exports.first = function (Handlebars) {
	/**
	 * Returns the first N items in the passed array.
	 * May be used inline or as an iterator. Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{first input[ count]}}
	 * @param  {Array}  input Collection
	 * @param  {Number} [count] Number of items to exclude
	 * @return {Array} Array excluding the number of items specified
	 *
	 * @signature {{#first input[ count]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/first}}
	 * @example
	 * // items = ['a','b','c','d','e','f']
	 * {{#first items, 2}}<span>{{this}}</span>{{/first}}
	 * // Result: <span>a</span><span>b</span>
	 */
	return function first (input, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "first" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? input.slice(0, count) : input[0];
		} else {
			var results = count ? input.slice(0, count) : [input[0]];
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
	/***/
};
