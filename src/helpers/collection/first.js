
/**
 * {{first}}
 * Returns the first item in a collection.
 *
 * @param  {Array}  array
 * @param  {[type]} count
 * @return {[type]}
 */
exports.first = function (Handlebars) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "first" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? array.slice(0, count) : array[0];
		} else {
			var results = count ? array.slice(0, count) : [array[0]];
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