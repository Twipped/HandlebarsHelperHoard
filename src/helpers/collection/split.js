
/**
 * {{split}}
 * Converts a string such as "foo, bar, baz" to an ES Array of strings.
 * @credit: http://bit.ly/1840DsB
 * @param  {string} str
 * @return {Array}
 */
exports.split = function (Handlebars) {
	return function (str, delimiter, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "split" needs at least 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			delimiter = undefined;
		}

		var results = str.split(delimiter);

		if (!options.fn) {
			return results;
		} else {
			var data = Handlebars.createFrame(options.data);
			return results.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === results.length - 1);
				return options.fn(result, {data: data});
			}).join('');
		}
	};
};