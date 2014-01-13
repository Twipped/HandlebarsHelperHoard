

exports.link = function (Handlebars) {
	return function (input) {
		
		function makeLink(src) {
			var ext = src.split('.').pop();
			switch (ext) {
			case 'css':
				return '<link rel="stylesheet" href="' + src + '">';
			case 'less':
				return '<link rel="stylesheet/less" href="' + src + '">';
			case 'html':
				return '<link rel="import" href="' + src + '">';
			}
		}

		if (Array.isArray(input)) {
			return new Handlebars.SafeString(input.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(input));
		}

	};
};