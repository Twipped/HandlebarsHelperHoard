
if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
	//Running inside node
	module.exports = hhn;

} else if ( typeof define === 'function' && define.amd ) {
	//Running inside an AMD loader
	define([], function () {return hhn;});
	
} else {
	//Dunno where we are, add it to the global context with a noConflict

	var previous = context.HandlebarsHelpersNeo;
	hhn.noConflict = function () {
		context.HandlebarsHelpersNeo = previous;
		return hhn;
	};
	context.HandlebarsHelpersNeo = hhn;

}

})(this);