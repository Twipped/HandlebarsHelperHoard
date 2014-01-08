
exports.jsfiddle = function (Handlebars) {
	return function (id, tabs) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "jsfiddle" needs 1 parameter');
		}

		options = arguments[arguments.length - 1];

		if (arguments.length === 2) {
			tabs = 'result,js,html,css';
		} else if (Array.isArray(tabs)) {
			tabs = tabs.join(',');
		}
		
		var result = '<iframe width="100%" height="300" src="http://jsfiddle.net/' + id + '/embedded/' + tabs + '/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
		
		return new Handlebars.SafeString(result);
	};
};