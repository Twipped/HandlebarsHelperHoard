
/**
 * {{any}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.any = function () {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "any" needs 1 parameter');
		}
		var i,c, yes = false;
		if (Array.isArray(input)) {
			for (i = 0, c = input.length; i < c; i++) {
				if (input[i]) {
					yes = true;
					break;
				}
			}
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			for (i = 0, c = keys.length; i < c; i++) {
				if (input[keys[i]]) {
					yes = true;
					break;
				}
			}
		} else if (input) {
			yes = !!input;
		}

		if (!options.fn) return yes;

		return yes ? options.fn(this) : options.inverse(this);
	};
};