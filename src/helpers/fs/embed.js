
exports.embed = function (Handlebars) {
	var fs = require('fs');
	var path = require('path');

	return function (src, lang) {
		var filepath = path.resolve(process.cwd(), src);
		var content = fs.readFileSync(filepath);
		var ext = src.split('.').pop();

		var output;
		if (!lang) {
			lang = ext;
		}
		
		switch (ext) {
		case 'md':
		case 'markdown':
		case 'mdown':
			output = content.replace(/^(```)/gm, '&#x60;&#x60;&#x60;');
			ext = 'md';
			break;
		case 'txt':
			output = content;
			ext = 'text';
			break;
		case 'hbs':
		case 'hbars':
			output = content.replace(/^(---)/gm, '---');
			ext = 'html';
			break;
		case 'less':
			output = content;
			ext = 'scss';
			break;
		case void 0:
			output = content;
			ext = '';
			break;
		default:
			output = content;
			ext = '';
		}

		return new Handlebars.SafeString(output);
	};
};