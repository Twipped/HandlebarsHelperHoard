
/**
 * {{all}}
 * @param  {Array}  array
 * @param  {Object} options
 */
exports.all = function () {
	return function (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "all" needs 1 parameter');
		}
		var i,c, yes = false;
		if (Array.isArray(input)) {
			yes = !!input[0];
			for (i = 1, c = input.length; i < c; i++) {
				
				if (!(yes = yes && !!input[i])) break;

			}
		} else if (typeof input === 'object') {
			var keys = Object.keys(input);
			yes = !!keys[0];
			for (i = 1, c = keys.length; i < c; i++) {

				if (!(yes = yes && !!input[i])) break;

			}
		} else if (input) {
			yes = !!input;
		}

		if (!options.fn) return yes;

		return yes ? options.fn(this) : options.inverse(this);
	};
};