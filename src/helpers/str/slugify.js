
exports.slugify = function () {
	return function (input, options) {
		if (arguments.length < 2) {
			throw new Error('Handlebars Helper "slugify" needs 1 parameter');
		}
		
		// 1) convert to lowercase
		// 2) remove dashes and pluses
		// 3) replace spaces with dashes
		// 4) remove everything but alphanumeric characters and dashes
		return input.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
	};
};