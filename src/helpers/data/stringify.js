
exports.stringify = function () {
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

		return JSON.stringify(input, undefined, pretty);
	};
};