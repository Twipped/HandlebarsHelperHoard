
exports.inflect = function (Handlebars) {
	return function (count, singular, plural, include, options) {
		if (arguments.length < 4) {
			throw new Error('Handlebars Helper "inflect" needs 3 parameters');
		}

		options = arguments[arguments.length - 1];

		var word = count > 1 || count === 0 ? plural : singular;
		if (arguments.length <= 4 || include === undefined || include === false) {
			return word;
		} else {
			return "" + count + " " + word;
		}
	};
};