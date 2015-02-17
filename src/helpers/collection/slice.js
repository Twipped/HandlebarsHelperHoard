
exports.slice = function (Handlebars) {
	/**
	 * Returns a slice of an array.
	 * May be used inline or as an iterator. Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{slice input start[ count]}}
	 * @param  {array<mixed>} input
	 * @param  {integer} start  Index to slice from
	 * @param  {integer} [count]  Number of items to slice.
	 * @return {array}
	 *
	 * @signature {{#slice input start[ count]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/slice}}
	 * @param  {array<mixed>} input
	 * @param  {integer} start  Index to slice from
	 * @param  {integer} [count]  Number of items to slice.
	 */
	return function slice (input, start, count, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "slice" needs 2 parameters');
		case 2:
			start = undefined;
			count = undefined;
			break;
		case 3:
			count = undefined;
			break;
		}

		var results = input.slice(start, count);

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
