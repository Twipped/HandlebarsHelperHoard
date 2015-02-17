
exports.isNotLike = function () {
	return function (/* value, test, options */) {
		var args = [].slice.call(arguments);
		var options = args.pop();
		var value = args.shift();

		var result = true;
		var i = args.length;
		while (i-- && result) {
			result = result && (value != args[i]);
		}

		if (!options.fn) return result || '';
		
		return result ? options.fn(this, options) : options.inverse(this, options);
	};
};