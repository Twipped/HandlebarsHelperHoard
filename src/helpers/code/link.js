
exports.link = function (Handlebars) {
	return function link (url, rel) {
		if (arguments.length === 2) rel = undefined;
		
		function makeLink(src) {
			if (rel) {
				return new Handlebars.SafeString('<link rel="' + rel + '" href="' + src + '">');
			}

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

		if (Array.isArray(url)) {
			return new Handlebars.SafeString(url.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(url));
		}

	};
};
