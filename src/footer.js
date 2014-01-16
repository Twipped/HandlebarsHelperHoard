
if ( typeof module === 'object' && module && typeof module.exports === 'object' ) {
	//Running inside node
	module.exports = hoard;

} else if ( typeof define === 'function' && define.amd ) {
	//Running inside an AMD loader
	define([], function () {return hoard;});
	
} else {
	//Dunno where we are, add it to the global context with a noConflict

	var previous = context.HelperHoard;
	hoard.noConflict = function () {
		context.HelperHoard = previous;
		return hoard;
	};
	context.HelperHoard = hoard;

}

})(this);