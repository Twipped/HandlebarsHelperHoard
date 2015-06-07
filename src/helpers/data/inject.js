
exports.inject = function () {

	/**
	 * Any values passed as named arguments are injected into the handlebars data context, using the name provided for each argument.
	 * @category data
	 * @name inject
	 *
	 * @signature {{inject key=value [key2=value2] ...}}
	 * @describe Inserts into the current context.
	 *
	 * @signature {{#inject key=value [key2=value2] ...}}<TEMPLATE>{{/inject}}
	 * @describe Inserts into the context of the tag block.
	 */
	
	return function inject (options) {
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

	/***/
};
