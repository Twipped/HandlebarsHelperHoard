
exports.before = function (Handlebars) {
	/**
	 * Returns all of the items in the array before the specified index.
	 * May be used inline or as an iterator.
	 *
	 * @category collections
	 * @signature {{before input[ count]}}
	 * @param  {Array}  input Collection
	 * @param  {Number} [count] Number of items to include
	 * @return {Array} Array excluding the number of items specified
	 *
	 * @signature {{#before input[ count]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/before}}
	 * @param  {Array}  input Collection
	 * @param  {Number} [count] Number of items to include
	 * @example
	 * // items = ['a','b','c','d','e','f']
	 * {{#before items 2}}<span>{{this}}</span>{{/before}}
	 * //Result: <span>a</span><span>b</span>
	 */
	return function before (input, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "before" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = undefined;
		}
		
		var results = input.slice(0, -count);
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
