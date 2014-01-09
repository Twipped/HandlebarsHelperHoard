
exports.sort = function (Handlebars) {
	return function (array, field, options) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "sort" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			field = undefined;
		}


		var results;
		if (field === undefined) {
			results = array.sort();
		} else {
			results = array.sort(function (a, b) {
				return a[field] > b[field];
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