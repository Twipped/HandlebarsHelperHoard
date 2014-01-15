
exports.phone = function () {
	return function (number) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "phoneNumber" needs 1 parameter minimum');
		}

		//strip non digits
		number = (''+number).replace(/[^0-9]/, '');

		if (number.length < 10) {
			return number;
		}

		var stack = ['(', number.substr(-10,3), ') ', number.substr(-7, 3), '-', number.substr(-4)];

		if (number.length > 10) {
			stack.unshift(number.substr(0, number.length - 10)+' ');
		}

		return stack.join('');
	};
};