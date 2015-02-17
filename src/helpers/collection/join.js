
exports.join = function (Handlebars) {
	/**
	 * Joins all elements of a collection into a string using a separator if specified.
	 * If used as an iterator block, the block contents will be used as a replacement for the item in the array, and then output after joined.
	 * Else condition evaluates if result is empty.
	 *
	 * @category collections
	 * @signature {{join items[ separator]}}
	 * @param  {array<mixed>} input
	 * @param  {string} [separator] Defaults to `','`
	 * @return {string}
	 *
	 * @signature {{#join items[ separator]}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/join}}
	 * @param  {array<mixed>} input
	 * @param  {string} [separator] Defaults to `','`
	 */
	return function join (input, separator, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "join" needs at least one parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			separator = undefined;
		}

		if (typeof separator === 'undefined') separator = ',';

		if (!input.length) {
			return options.inverse(this);
		}

		if (options.fn) {
			var data = Handlebars.createFrame(options.data);
			input = input.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === input.length - 1);
				return options.fn(result, {data: data});
			});
		}
		
		return input.join(separator);
	};
	/***/
};
