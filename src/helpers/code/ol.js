

exports.ol = function (Handlebars) {
	return function (input, options) {
		options = arguments[arguments.length - 1];

		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ol" needs 1 parameter');
		}

		var stack = ['<ol'];

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {
				stack.push(' ' + key + '="' + hash[key] + '"');
			});
		}

		stack.push('>');

		if (!Array.isArray(input)) {
			input = [input];
		}

		if (!options.fn) {
			input.forEach(function (item, i) {
				stack.push('<li>' + Handlebars.Utils.escapeExpression(item) + '</li>');
			});
		} else {
			if (input.length) {
				var data = Handlebars.createFrame(options.data);
				input.forEach(function (item, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === input.length - 1);
					stack.push('<li>' + options.fn(item, {data: data}) + '</li>');
				});
			} else {
				stack.push('<li>' + options.inverse(this) + '</li>');
			}
		}

		stack.push('</ol>');

		return new Handlebars.SafeString(stack.join(''));
	};
};