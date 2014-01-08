
/**
 * {{inArray}}
 *
 * @param  {Array}  array   [description]
 * @param  {[type]} value   [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
exports.inArray = function () {
	return function (input, value, options) {
		var result = input.indexOf(value) >= 0;

		if (!options.fn) return result;
		
		return result ? options.fn(this) : options.inverse(this);
	};
};