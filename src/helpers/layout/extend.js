
exports.extend = function (Handlebars) {
	return function (layout, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "extend" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		var context = Object.create(this || null);
		var template = Handlebars.partials[layout];

		if (typeof template === 'undefined') {
			throw new Error("Missing layout: '" + layout + "'");
		}

		if (typeof template === 'string') {
			template = Handlebars.compile(template);
		}

		if (options.fn) {
			// run the contents of the embed so that the content blocks apply
			// but don't use the output.
			options.fn(context);
		}

		return new Handlebars.SafeString(template(context));
	};
};