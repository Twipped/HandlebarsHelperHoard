
exports.startsWith = function () {
	return function (haystack, needle, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "startsWith" needs 2 parameters');
		}

		//make sure we have strings
		haystack = ''+haystack;
		needle = ''+needle;

		var result = haystack.substr(0,needle.length) === needle;

		if (!options.fn) {
			return result;
		}

		return result ? options.fn(this) : options.inverse(this);
	};
};