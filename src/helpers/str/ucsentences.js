
exports.ucsentences = function () {
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
			return input.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		} else {
			return '';
		}
	};
};