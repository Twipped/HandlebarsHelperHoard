
exports.split = function (Handlebars) {
	/**
	 * Splits a string into an array.
	 * May be used inline or as an iterator. Else condition will never evaluate.
	 *
	 * @category collections
	 * @signature {{split input[ delimiter]}}
	 * @param  {string} input
	 * @param  {string} [delimiter] Defaults to ',' if not provided.
	 * @return {array<string>}
	 *
	 * @signature {{#split input[ delimiter]}}<TEMPLATE>{{/split}}
	 */
	return function split (input, delimiter, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "split" needs at least 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			delimiter = undefined;
		}

		var results = input.split(delimiter);

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
	/***/
};
