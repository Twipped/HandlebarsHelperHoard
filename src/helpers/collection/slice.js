
/**
 * Returns all of the items in the collection before the specified
 * count. Opposite of {{after}}.
 * @param  {Array}  array
 * @param  {string} start
 * @param  {number} count
 * @return {Array}
 */
exports.slice = function (Handlebars) {
	return function (array, start, count, options) {
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

		var results = array.slice(start, count);

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