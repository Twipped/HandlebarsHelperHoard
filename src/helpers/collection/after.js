
/**
 * Returns all of the items in the collection after the specified count.
 * @param  {Array}  array Collection
 * @param  {Number} count Number of items to exclude
 * @return {Array}        Array excluding the number of items specified
 */
exports.after = function (Handlebars) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "after" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = undefined;
		}

		var results = array.slice(count);
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
};