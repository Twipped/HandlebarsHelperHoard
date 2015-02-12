
function load (Handlebars) {
	var args = [],
		c,
		helper;

	// flatten the arguments tree
	(function descend(level) {
		if (Array.isArray(level)) {
			level.forEach(descend);
		} else {
			args.push(level);
		}
	})(Array.prototype.slice.call(arguments, 1));

	c = args.length;

	// if no helpers were defined, load all of them.
	if (!c) {
		args = Object.keys(exports);
		c = args.length;
	}

	while (c--) {
		helper = exports[args[c]].call(this, Handlebars);
		Handlebars.registerHelper(args[c], helper);
	}
}

load.load = load;
load.helpers = exports;
