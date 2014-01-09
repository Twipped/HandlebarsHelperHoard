
/**
 * Returns the last item in a collection. Opposite of `first`.
 * @param  {Array}  array [description]
 * @param  {[type]} count [description]
 * @return {[type]}       [description]
 */
exports.last = function (Handlebars) {
	return function (array, count, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "last" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			count = 1;
		}

		if (!options.fn) {
			return count > 1 ? array.slice(-count) : array[array.length - 1];
		} else {
			var results = count ? array.slice(-count) : [array[array.length - 1]];
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