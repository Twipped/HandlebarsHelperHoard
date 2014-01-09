

exports.filter = function (Handlebars) {
	return function(input, value, property, options) {

		options = arguments[arguments.length - 1];

		var condition = function (d) { return d; };

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "filter" needs atleast 1 parameter');
		case 2:
			property = options.hash && options.hash.property;
			value = options.hash && options.hash.value;

			if (property && value) {
				condition = function (d) { return d[property] == value; };
			} else if (property) {
				condition = function (d) { return d[property] !== undefined; };
			} else if (value) {
				condition = function (d) { return d === value; };
			}
			break;
		case 3:
			condition = function (d) { return d === value; };
			break;

		default:
			condition = function (d) { return d[property] == value; };
			break;
		}

		var results = input.filter(condition);

		if (!options.fn) return results;

		var that = this;


		if(results && results.length > 0) {
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
		return content;
	};
};

