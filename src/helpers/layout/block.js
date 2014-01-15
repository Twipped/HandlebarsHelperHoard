
exports.block = function (Handlebars) {
	return function (name, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "block" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		this._blocks = this._blocks || {};
		
		var block = this._blocks[name];

		var optionsFn = options.fn || function () {return '';};

		var result;
		switch (block && block.fn && block.mode) {
		case 'append':
			result = optionsFn(this) + block.fn(this);
			break;
		case 'prepend':
			result = block.fn(this) + optionsFn(this);
			break;
		case 'replace':
			result = block.fn(this);
			break;
		default:
			result = optionsFn(this);
			break;
		}

		return new Handlebars.SafeString(result);
	};
};