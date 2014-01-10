
exports.append = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "append" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: 'append',
			fn: options.fn
		};
	};
};