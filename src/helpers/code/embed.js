
exports.embed = function (Handlebars, Utils) {
	return function (src, lang) {
		var content = Utils.readFile(src);
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
		var result = '```' + lang + '\n' + output + '\n```\n';
		return new Handlebars.SafeString(result);
	};
};