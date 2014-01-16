
exports.embed = function (Handlebars) {
	return function (src, cwd) {
		var fs = require('fs');
		var path = require('path');

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "embed" needs 1 parameter');
		case 2:
			cwd = process.cwd();
		}

		var filepath = path.resolve(cwd, src);
		var content = fs.readFileSync(filepath);
		
		return new Handlebars.SafeString(content);
	};
};