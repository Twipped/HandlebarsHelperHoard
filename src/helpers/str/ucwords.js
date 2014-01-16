
exports.ucwords = function () {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length <= 1) {
			if (!options.fn) {
				throw new Error('Handlebars Helper "ucwords" needs 1 parameter minimum');
			} else {
				input = options.fn(this);
			}
		}

		if(input && typeof input === "string") {
			return input.replace(/\w\S*/g, function (word) {
				return word.charAt(0).toUpperCase() + word.substr(1);
			});
		} else {
			return '';
		}
	};
};