
exports.humanMilliseconds = function (Handlebars) {
	return function (seconds, detailed) {

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "humanMilliseconds" needs 1 parameter');
		case 2:
			detailed = false;
			break;
		}

		var keys  = ['Year',      'Month',    'Week',    'Day',    'Hour',    'Minute',    'Second', 'Millisecond'],
			divs  = [31536000000, 2592000000, 604800000, 86400000, 3600000,   60000,       1000,     1],
			stack = [],
			level = 0,
			value;

		seconds = Math.abs(seconds);

		while (seconds) {
			value = Math.floor(seconds / divs[level]);
			seconds = seconds % divs[level];
			if (value) {
				stack.push( value + ' ' + keys[level] + (value > 1 ? 's' : ''));
				if (!detailed) break;
			}
			level++;
		}

		return stack.join(' ');

	};
};