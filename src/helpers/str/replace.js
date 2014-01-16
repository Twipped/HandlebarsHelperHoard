
exports.replace = function () {
	return function (haystack, needle, replacement, options) {
		options = arguments[arguments.length - 1];

		var hashNeedle = options.hash && options.hash.search,
			hashReplace = options.hash && options.hash.replace,
			hashRegex = options.hash && options.hash.regex;

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				if (hashNeedle === undefined) {
					throw new Error('Handlebars Helper "replace" needs a search string');
				}
			} else {
				haystack = options.fn(this);
				needle = hashNeedle;
				replacement = hashReplace || '';
			}
			break;

		case 2:
			if (!options.fn) {
				if (hashNeedle === undefined) {
					throw new Error('Handlebars Helper "replace" needs a search string');
				}

				needle = hashNeedle || arguments[0];
				replacement = hashReplace || '';
			} else {
				haystack = options.fn(this);
				needle = hashNeedle || arguments[0];
				replacement = hashReplace || '';
			}
			break;
		case 3:
			if (!options.fn) {
				replacement = '';
			} else {
				haystack = options.fn(this);
				needle = hashNeedle || arguments[0];
				replacement = hashReplace || arguments[1];
			}
			break;
		}

		if (hashRegex) {
			needle = new RegExp(needle);
		}

		return haystack.replace(needle, replacement);

	};
};