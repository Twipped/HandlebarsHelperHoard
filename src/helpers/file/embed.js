
exports.embed = function (Handlebars) {
	var fs = require('fs');
	var path = require('path');

	return function (src) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "embed" needs 1 parameter');
		}

		var filepath = path.resolve(process.cwd(), src);
		var content = fs.readFileSync(filepath);
		
		return new Handlebars.SafeString(content);
	};
};