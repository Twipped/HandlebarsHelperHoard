
exports.stringify = function (Handlebars) {
	return function (input, pretty, options) {

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "stringify" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			pretty = undefined;
		} else {
			if (pretty && typeof pretty !== 'string') {
				pretty = '  ';
			}
		}

		return new Handlebars.SafeString(JSON.stringify(input, undefined, pretty));
	};
};