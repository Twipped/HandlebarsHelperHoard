
exports.values = function (Handlebars) {
	return function (array, options) {
		if (!Array.isArray(array) && typeof array === 'object') {
			array = Object.keys(array).map(function (k) { return array[k]; });
		}

		if (!options.fn) {
			return array;
		} else {
			if (array.length) {
				var data = Handlebars.createFrame(options.data);
				return array.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === array.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};