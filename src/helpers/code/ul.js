
exports.ul = function (Handlebars) {
	/**
	 * Generate an unordered list from an array.
	 * Any named properties will be applied to the UL tag.
	 * @category code
	 * @signature {{ul items}}
	 * @param  {array<mixed>} input   Items to be iterated over, outputting directly to as LI contents.
	 *
	 * @signature {{#ul items}}<TEMPLATE>[{{else}}<TEMPLATE>]{{/ul}}
	 * @param  {array<mixed>} input Items to apply the enclosed template against to produce LI contents.
	 * @example
	 * {{#ul emails class="email-list"}}<a href="mailto:{{this}}">{{this}}</a>{{else}}There are no emails.{{/ul}}
	 */
	return function ul (input, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "ul" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		var stack = ['<ul'];

		if (options.hash) {
			Object.keys(options.hash).forEach(function (key) {
				stack.push(' ' + key + '="' + options.hash[key] + '"');
			});
		}

		stack.push('>');

		if (!Array.isArray(input)) {
			input = [input];
		}

		if (!options.fn) {
			input.forEach(function (item) {
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

		stack.push('</ul>');

		return new Handlebars.SafeString(stack.join(''));
	};
	/***/
};
