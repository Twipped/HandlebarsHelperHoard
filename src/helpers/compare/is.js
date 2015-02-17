
exports.is = function () {
	return function (value, test, options) {
		var args = [].slice.call(arguments);
		var options = args.pop();
		var value = args.shift();

		var result = args.indexOf(value) >= 0;
		
		if (!options.fn) return result || '';

		return result ? options.fn(this, options) : options.inverse(this, options);
	};
};