

exports.script = function (Handlebars) {
	return function (input) {
		
		function makeLink(src) {
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

		if (Array.isArray(input)) {
			return new Handlebars.SafeString(input.map(makeLink).join('\n'));
		} else {
			return new Handlebars.SafeString(makeLink(input));
		}

	};
};