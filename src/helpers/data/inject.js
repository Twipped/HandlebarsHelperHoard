
exports.inject = function () {
	return function (options) {
		var context = this;

		options = arguments[arguments.length - 1];

		if (options.fn) {
			context = Object.create(this || null);
		}

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {

				var value = options.hash[key];
				if (String(value)[0] === '{') {
					value = JSON.parse(value);
				}

				context[key] = value;
			});
		}

		return options.fn && options.fn(context) || '';
	};
};