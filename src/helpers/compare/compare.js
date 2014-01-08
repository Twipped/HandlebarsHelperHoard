
exports.compare = function () {
	return function(left, operator, right, options) {
		if (arguments.length < 3) {
			throw new Error('Handlebars Helper "compare" needs 2 parameters');
		}

		if (options === undefined) {
			options = right;
			right = operator;
			operator = '===';
		}

		var operators = {
			'==':     function(l, r) {return l == r; },
			'===':    function(l, r) {return l === r; },
			'!=':     function(l, r) {return l != r; },
			'!==':    function(l, r) {return l !== r; },
			'<':      function(l, r) {return l < r; },
			'>':      function(l, r) {return l > r; },
			'<=':     function(l, r) {return l <= r; },
			'>=':     function(l, r) {return l >= r; },
			'typeof': function(l, r) {return typeof l == r; },
			'%':      function(l, r) {return l % r; }
		};

		if (!operators[operator]) {
			throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
		}

		var result = !!operators[operator](left, right);

		if (!options.fn) return result;

		return result ? options.fn(this) : options.inverse(this);
	};
};