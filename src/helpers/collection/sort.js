
exports.sort = function (Handlebars) {
	return function (input, key, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "sort" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			key = undefined;
		}

		var results = input.concat();
		if (key === undefined) {
			results.sort();
		} else {
			results.sort(function (a, b) {
				if (typeof a !== 'object' && typeof b !== 'object') return 0;
				if (typeof a !== 'object') return -1;
				if (typeof b !== 'object') return 1;
				return a[key] > b[key];
			});
		}

		if (!options.fn) {
			return results;
		} else {
			if (results.length) {
				var data = Handlebars.createFrame(options.data);
				return results.map(function (result, i) {
					data.index = i;
					data.first = (i === 0);
					data.last  = (i === results.length - 1);
					return options.fn(result, {data: data});
				}).join('');
			} else {
				return options.inverse(this);
			}
		}
	};
};
