
exports.prepend = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "prepend" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: 'prepend',
			fn: options.fn
		};
	};
};