
/**
 * Joins all elements of a collection into a string
 * using a separator if specified.
 * @param  {Array}  array     [description]
 * @param  {[type]} separator [description]
 * @return {[type]}           [description]
 */
exports.join = function (Handlebars) {
	return function (array, separator, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "join" needs 2 parameters');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			separator = undefined;
		}

		if (!array.length) {
			return options.inverse(this);
		}

		if (options.fn) {
			var data = Handlebars.createFrame(options.data);
			array = array.map(function (result, i) {
				data.index = i;
				data.first = (i === 0);
				data.last  = (i === array.length - 1);
				return options.fn(result, {data: data});
			});
		}
		
		return array.join(separator);
	};
};