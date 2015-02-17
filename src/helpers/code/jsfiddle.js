
exports.jsfiddle = function (Handlebars) {
	/**
	 * Embeds a jsfiddle snippet
	 * @category code
	 * @signature {{jsfiddle fiddleId[, tabs]}}
	 * @param  {string} fiddleId
	 * @param  {string} [tabs]    Comma separated list of which tabs to display (result,js,html,css)
	 */
	return function jsfiddle (fiddleId, tabs) {
		if (arguments.length === 1) {
			throw new Error('Handlebars Helper "jsfiddle" needs 1 parameter');
		}

		if (arguments.length === 2) {
			tabs = 'result,js,html,css';
		} else if (Array.isArray(tabs)) {
			tabs = tabs.join(',');
		}
		
		var result = '<iframe width="100%" height="300" src="http://jsfiddle.net/' + fiddleId + '/embedded/' + tabs + '/presentation/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>';
		
		return new Handlebars.SafeString(result);
	};
	/***/
};
