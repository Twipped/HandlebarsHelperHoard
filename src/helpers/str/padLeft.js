
exports.padLeft = function (Handlebars) {
	return function (input, length, using, options) {
		options = arguments[arguments.length - 1];

		switch (arguments.length) {
		case 1:
			if (!options.fn) {
				throw new Error('Handlebars Helper "padLeft" needs 2 parameters minimum');
			} else {
				input = options.fn(this);
				length = options.hash && options.hash.length || 0;
				using = options.hash && options.hash.using || ' ';
			}
			break;
		case 2:
			length = 0;
			using = ' ';
			break;
		case 3:
			using = ' ';
			break;
		}

		//make sure we've got a string
		input = ''+input;

		if (length < input.length) {
			return input;
		}

		return input + new Array(length - input.length + 1).join(using);

	};
};