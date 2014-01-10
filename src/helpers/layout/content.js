
exports.content = function (Handlebars) {
	return function (name, mode, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "content" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (!mode || arguments.length === 2) {
			mode = options.hash && options.hash.mode || 'replace';
		}

		this._blocks = this._blocks || {};

		this._blocks[name] = {
			mode: mode.toLowerCase(),
			fn: options.fn
		};
	};
};