
var makeTests = require('./testBuilder.js');

exports['after'] = makeTests([
	{
		template: '{{after a }}',
		input: {a:[1,2,3,4,5]},
		output: '1,2,3,4,5'
	},
	{
		template: '{{after a 2}}',
		input: {a:[1,2,3,4,5]},
		output: '3,4,5'
	},
	{
		template: '{{after a 6}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#after a }}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: '|1||2||3||4||5|'
	},
	{
		template: '{{#after a 2}}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: '|3||4||5|'
	},
	{
		template: '{{#after a 6}}|{{this}}|{{/after}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
]);

exports['all'] = makeTests([
	{
		template: '{{all a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[0, 0]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[0, 1]},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:[1, 2]},
		output: 'true'
	},
	{
		template: '{{all a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{all a }}',
		input: {a:{a:true}},
		output: 'true'
	},
	{
		template: '{{all a }}',
		input: {a:{a:true, b: false}},
		output: ''
	},

	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0, 0]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[0, 1]},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:[1, 2]},
		output: 'yes'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:{}},
		output: 'no'
	},
	{
		template: '{{#all a }}yes{{else}}no{{/all}}',
		input: {a:{a:true}},
		output: 'yes'
	},

]);


exports['any'] = makeTests([
	{
		template: '{{any a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:[0, 0]},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:[0, 1]},
		output: 'true'
	},
	{
		template: '{{any a }}',
		input: {a:[1, 2]},
		output: 'true'
	},
	{
		template: '{{any a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{any a }}',
		input: {a:{a:true}},
		output: 'true'
	},

	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0]},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0, 0]},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[0, 1]},
		output: 'yes'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:[1, 2]},
		output: 'yes'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:{}},
		output: 'no'
	},
	{
		template: '{{#any a }}yes{{else}}no{{/any}}',
		input: {a:{a:true}},
		output: 'yes'
	},

]);

exports['before'] = makeTests([
	{
		template: '{{before a }}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{before a 3}}',
		input: {a:[1,2,3,4,5]},
		output: '1,2'
	},
	{
		template: '{{before a 6}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#before a }}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
	{
		template: '{{#before a 3}}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: '|1||2|'
	},
	{
		template: '{{#before a 6}}|{{this}}|{{/before}}',
		input: {a:[1,2,3,4,5]},
		output: ''
	},
]);

exports['empty'] = makeTests([
	{
		template: '{{empty a }}',
		input: {a:1},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:''},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:[]},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:{}},
		output: 'true'
	},
	{
		template: '{{empty a }}',
		input: {a:[0]},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:[1]},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:{a:0}},
		output: ''
	},
	{
		template: '{{empty a }}',
		input: {a:{a:1}},
		output: ''
	},

	{
		template: '{{#empty a }}yes{{else}}no{{/empty}}',
		input: {a:1},
		output: 'no'
	},
	{
		template: '{{#empty a }}yes{{else}}no{{/empty}}',
		input: {a:''},
		output: 'yes'
	}
]);

exports['filter'] = makeTests([
	{
		template: '{{filter original }}',
		input: {original: [0,1,2, undefined, 3, null, 4]},
		output: '1,2,3,4'
	},
	{
		template: '{{filter original 2 }}',
		input: {original: [0,1,2, undefined, 3, null, 4]},
		output: '2'
	},
	{
		template: '{{#filter original 1 "a"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [{a:1}, {b:2}, {a:1,b:2}, {}]},
		output: '|a:1,||a:1,b:2,|'
	},
	{
		template: '{{#filter original property="b"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [{a:1}, {b:2}, {a:1,b:2}, {}]},
		output: '|b:2,||a:1,b:2,|'
	},
	{
		template: '{{#filter original}}|{{#each this}}{{@index}}:{{this}},{{/each}}|{{else}}no{{/filter}}',
		input: {original: [0,0,0]},
		output: 'no'
	},
	{
		template: '{{#filter original value=5}}|{{this}}|{{else}}no{{/filter}}',
		input: {original: [1,2,3]},
		output: 'no'
	}
]);



exports['first'] = makeTests([
	{
		template: '{{first a }}',
		input: {a:[3,2,1]},
		output: '3'
	},
	{
		template: '{{first a 2}}',
		input: {a:[3,2,1]},
		output: '3,2'
	},
	{
		template: '{{#first a 2}}|{{this}}|{{else}}no{{/first}}',
		input: {a:[3,2,1]},
		output: '|3||2|'
	},
	{
		template: '{{#first a 2}}|{{this}}|{{else}}no{{/first}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['inArray'] = makeTests([
	{
		template: '{{inArray a b}}',
		input: {a:[1,2,3], b:2},
		output: 'true'
	},
	{
		template: '{{inArray a b}}',
		input: {a:[1,2,3], b:0},
		output: ''
	},
	{
		template: '{{#inArray a b}}yes{{else}}no{{/inArray}}',
		input: {a:[1,2,3], b:1},
		output: 'yes'
	},
	{
		template: '{{#inArray a b}}yes{{else}}no{{/inArray}}',
		input: {a:[1,2,3], b:4},
		output: 'no'
	}
]);

exports['join'] = makeTests([
	{
		template: '{{join a}}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{join a "-"}}',
		input: {a:[1,2,3]},
		output: '1-2-3'
	},
	{
		template: '{{join a ""}}',
		input: {a:[1,2,3]},
		output: '123'
	},
	{
		template: '{{#join a "|"}}<{{this}}>{{else}}no{{/join}}',
		input: {a:[1,2,3]},
		output: '<1>|<2>|<3>'
	},
	{
		template: '{{#join a "|"}}<{{this}}>{{else}}no{{/join}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['keys'] = makeTests([
	{
		template: '{{keys a}}',
		input: {a:['a','b','c']},
		output: '0,1,2'
	},
	{
		template: '{{keys a}}',
		input: {a:{a:1, b: 2, c:3}},
		output: 'a,b,c'
	},
	{
		template: '{{keys a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#keys a}}<{{this}}>{{else}}no{{/keys}}',
		input: {a:['a','b','c']},
		output: '<0><1><2>'
	},
	{
		template: '{{#keys a}}<{{this}}>{{else}}no{{/keys}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['last'] = makeTests([
	{
		template: '{{last a }}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{last a 2}}',
		input: {a:[3,2,1]},
		output: '2,1'
	},
	{
		template: '{{#last a 2}}|{{this}}|{{else}}no{{/last}}',
		input: {a:[3,2,1]},
		output: '|2||1|'
	},
	{
		template: '{{#last a 2}}|{{this}}|{{else}}no{{/last}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['length'] = makeTests([
	{
		template: '{{length a }}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{length a }}',
		input: {a:[]},
		output: '0'
	},
	{
		template: '{{#length a}}yes{{else}}no{{/length}}',
		input: {a:[3,2,1]},
		output: 'yes'
	},
	{
		template: '{{#length a}}yes{{else}}no{{/length}}',
		input: {a:[]},
		output: 'no'
	},

	{
		template: '{{length a 3}}',
		input: {a:[1,2,3]},
		output: '3'
	},
	{
		template: '{{length a 3}}',
		input: {a:[]},
		output: '0'
	},
	{
		template: '{{#length a 3}}yes{{else}}no{{/length}}',
		input: {a:[3,2,1]},
		output: 'yes'
	},
	{
		template: '{{#length a 3}}yes{{else}}no{{/length}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['notEmpty'] = makeTests([
	{
		template: '{{notEmpty a }}',
		input: {a:1},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:''},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{}},
		output: ''
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[0]},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:[1]},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{a:0}},
		output: 'true'
	},
	{
		template: '{{notEmpty a }}',
		input: {a:{a:1}},
		output: 'true'
	},

	{
		template: '{{#notEmpty a }}yes{{else}}no{{/notEmpty}}',
		input: {a:1},
		output: 'yes'
	},
	{
		template: '{{#notEmpty a }}yes{{else}}no{{/notEmpty}}',
		input: {a:''},
		output: 'no'
	}
]);

exports['slice'] = makeTests([
	{
		template: '{{slice a }}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{slice a 1}}',
		input: {a:[3,2,1]},
		output: '2,1'
	},
	{
		template: '{{slice a 1 2}}',
		input: {a:[3,2,1]},
		output: '2'
	},
	{
		template: '{{slice a 0 1}}',
		input: {a:[3,2,1]},
		output: '3'
	},
	{
		template: '{{slice a -1}}',
		input: {a:[3,2,1]},
		output: '1'
	},
	{
		template: '{{#slice a 1}}|{{this}}|{{else}}no{{/slice}}',
		input: {a:[3,2,1]},
		output: '|2||1|'
	},
	{
		template: '{{#slice a 1}}|{{this}}|{{else}}no{{/slice}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['sort'] = makeTests([
	{
		template: '{{sort a }}',
		input: {a:[1,2,3]},
		output: '1,2,3'
	},
	{
		template: '{{sort a}}',
		input: {a:[3,2,1]},
		output: '1,2,3'
	},
	{
		template: '{{sort a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#sort a "a"}}|{{#each this}}{{@key}}:{{this}},{{/each}}|{{else}}no{{/sort}}',
		input: {a:[{a:4}, {a:3}, {b:1}]},
		output: '|a:3,||a:4,||b:1,|'
	},
	{
		template: '{{#sort a}}|{{this}}|{{else}}no{{/sort}}',
		input: {a:[]},
		output: 'no'
	}
]);

exports['split'] = makeTests([
	{
		template: '{{split a ","}}',
		input: {a:'1,2,3'},
		output: '1,2,3'
	},
	{
		template: '{{#split a ","}}<{{this}}>{{else}}no{{/split}}',
		input: {a:'1,2,3'},
		output: '<1><2><3>'
	}
]);

exports['values'] = makeTests([
	{
		template: '{{values a}}',
		input: {a:['a','b','c']},
		output: 'a,b,c'
	},
	{
		template: '{{values a}}',
		input: {a:{a:1, b: 2, c:3}},
		output: '1,2,3'
	},
	{
		template: '{{values a}}',
		input: {a:[]},
		output: ''
	},
	{
		template: '{{#values a}}<{{this}}>{{else}}no{{/values}}',
		input: {a:['a','b','c']},
		output: '<a><b><c>'
	},
	{
		template: '{{#values a}}<{{this}}>{{else}}no{{/values}}',
		input: {a:[]},
		output: 'no'
	}
]);
