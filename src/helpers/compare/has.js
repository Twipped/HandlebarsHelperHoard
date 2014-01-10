
/**
 * {{has}}
 *
 * @param  {*}  input   [description]
 * @param  {*} value   [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
exports.has = function () {
	return function (input, value, options) {
		var result = input.indexOf(value) >= 0;
		if (!options.fn) return result;
		return result ? options.fn(this) : options.inverse(this);
	};
};