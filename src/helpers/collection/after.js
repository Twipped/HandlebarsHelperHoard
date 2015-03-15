
exports.after = function (Handlebars) {
	/**
	 * Returns all of the items in the collection after the specified index.
	 * May be used inline or as an iterator.
	 *
	 * @category collections
	 * @signature {{after items[ count]}}
	 * @param  {Array}  input Collection
	 * @param  {Number} [count] Number of items to exclude
	 * @return {Array} Array excluding the number of items specified
	 *
	 * @signature {{#after input[ count]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/after}}
	 * @example
	 * // items = ['a','b','c','d','e','f']
	 * {{#after items, 2}}<span>{{this}}</span>{{/after}}
	 * // Result: <span>c</span><span>d</span><span>e</span><span>f</span>
	 */
	return function after (input, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "after" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = undefined;
		}

		var results = input.slice(count);
		if (!options.fn) {
			return results;
		} else {
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
