
exports.script = function (Handlebars) {
	return function script (url, type) {
		if (arguments.length === 2) type = undefined;

		function makeLink(src) {
			if (type) {
				return new Handlebars.SafeString('<script type="' + type + '" src="' + src + '"></script>');
			}

			var ext = src.split('.').pop();
			switch (ext) {
			case 'js':
				return '<script src="' + src + '"></script>';
			case 'coffee':
				return '<script type="text/coffeescript" src="' + src + '"></script>';
			case 'hbs':
				return '<script type="text/handlebars" src="' + src + '"></script>';
			}
		}

		if (Array.isArray(url)) {
			return new Handlebars.SafeString(url.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(url));
		}
	};
};
