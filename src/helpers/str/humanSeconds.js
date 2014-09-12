
exports.humanSeconds = function (Handlebars) {
	return function (seconds, detailed) {

		switch (arguments.length) {
		case 1:
			throw new Error('Handlebars Helper "humanSeconds" needs 1 parameter');
		case 2:
			detailed = false;
			break;
		}

		var keys  = ['Year',  'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
			divs  = [31536000, 2592000, 604800, 86400, 3600,   60,       1],
			stack = [],
			level = 0,
			value;

		seconds = Math.abs(seconds);

		while (seconds) {
			value = Math.floor(seconds / divs[level]);
			seconds = seconds % divs[level];

			//if we're on the last unit and the remaining seconds is greater than half the current unit size
			if (level === divs.length - 1 && seconds > divs[level] / 2) {
				//round up
				value++;
			}

			if (value) {
				stack.push( value + ' ' + keys[level] + (value > 1 ? 's' : ''));
				if (!detailed) break;
			}
			level++;
		}

		return stack.join(' ');

	};
};