
/**
 * {{empty}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.empty = function () {
	return function (input, options) {
		var i,c, yes = false;
		if (Array.isArray(input)) {
			yes = input.length <= 0;
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = keys.length <= 0;
		} else {
			yes = !input;
		}

		if (!options.fn) {
			return yes;
		} else {
			return yes ? options.fn(this) : options.inverse(this);
		}
	};
};