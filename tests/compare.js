

var makeTests = require('./testBuilder.js');

exports['and'] = makeTests([
	{
		template: '{{and a b c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{and a b}}',
		input: {a:0, b:1},
		output: '0'
	},
	{
		template: '{{and a b}}',
		input: {a:'', b:'1'},
		output: ''
	},
	{
		template: '{{and a b}}',
		input: {a:'0', b:'1'},
		output: '1'
	},
	{
		template: '{{and a}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{and c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{and "<div>"}}',
		output: '&lt;div&gt;'
	},
	{
		template: '{{{and "<div>"}}}',
		output: '<div>'
	},
	{
		template: '{{#and a b c}}content{{/and}}',
		input: {a:1, b:2, c:0},
		output: ''
	},
	{
		template: '{{#and a b}}content{{/and}}',
		input: {a:0, b:0},
		output: ''},
	{
		template: '{{#and a b}}content{{else}}other content{{/and}}',
		input: {a:0, b:''},
		output: 'other content'
	},
	{
		template: '{{#and a}}content{{/and}}',
		input: {a:1, b:2},
		output: 'content'
	}
]);

exports['compare'] = makeTests([
	{
		template: '{{compare a b}}',
		input: {a:1, b:1},
		output: 'true'
	},
	{
		template: '{{compare a "===" b}}',
		input: {a:1, b:1},
		output: 'true'
	},
	{
		template: '{{compare a "===" b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{compare a "==" b}}',
		input: {a:1, b:'1'},
		output: 'true'
	},
	{
		template: '{{compare a "==" b}}',
		input: {a:1, b:'0'},
		output: ''
	},
	{
		template: '{{compare a "typeof" b}}',
		input: {a:1, b:'number'},
		output: 'true'
	},
	{
		template: '{{compare a "%" b}}',
		input: {a:11, b:2},
		output: 'true'
	},
	{
		template: '{{compare a "%" b}}',
		input: {a:10, b:2},
		output: ''
	},
	{
		template: '{{#compare a b}}content{{/compare}}',
		input: {a:1, b:1},
		output: 'content'
	},
	{
		template: '{{#compare a b}}content a{{else}}content b{{/compare}}',
		input: {a:1, b:1},
		output: 'content a'
	},
	{
		template: '{{#compare a b}}content a{{else}}content b{{/compare}}',
		input: {a:1, b:0},
		output: 'content b'
	},
]);

exports['contains'] = makeTests([
	{
		template: '{{contains a b}}',
		input: {a:[1,2,3], b:2},
		output: 'true'
	},
	{
		template: '{{contains a b}}',
		input: {a:[1,2,3], b:0},
		output: ''
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:[1,2,3], b:1},
		output: 'yes'
	},
	{
		template: '{{#contains a b}}yes{{else}}no{{/contains}}',
		input: {a:[1,2,3], b:4},
		output: 'no'
	}
]);

exports['gt'] = makeTests([
	{
		template: '{{gt a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{gt a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{gt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#gt a b}}yes{{else}}no{{/gt}}',
		input: {a:2, b:2},
		output: 'no'
	}
]);

exports['gte'] = makeTests([
	{
		template: '{{gte a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{gte a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{gte a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#gte a b}}yes{{else}}no{{/gte}}',
		input: {a:2, b:2},
		output: 'yes'
	}
]);

exports['is'] = makeTests([
	{
		template: '{{is a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{is a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{is a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{is a b}}',
		input: {a:'2', b:2},
		output: ''
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:2},
		output: 'yes'
	},
	{
		template: '{{#is a b}}yes{{else}}no{{/is}}',
		input: {a:2, b:'2'},
		output: 'no'
	}
]);

exports['isLike'] = makeTests([
	{
		template: '{{isLike a b}}',
		input: {a:1, b:2},
		output: ''
	},
	{
		template: '{{isLike a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{isLike a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{isLike a b}}',
		input: {a:'2', b:2},
		output: 'true'
	},
	{
		template: '{{isLike a b}}',
		input: {a:'2', b:'1'},
		output: ''
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:1, b:2},
		output: 'no'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:2},
		output: 'yes'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:2, b:'2'},
		output: 'yes'
	},
	{
		template: '{{#isLike a b}}yes{{else}}no{{/isLike}}',
		input: {a:'2', b:'1'},
		output: 'no'
	}
]);

exports['isnt'] = makeTests([
	{
		template: '{{isnt a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isnt a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isnt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isnt a b}}',
		input: {a:'2', b:2},
		output: 'true'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isnt a b}}yes{{else}}no{{/isnt}}',
		input: {a:2, b:'2'},
		output: 'yes'
	}
]);

exports['isntLike'] = makeTests([
	{
		template: '{{isntLike a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{isntLike a b}}',
		input: {a:2, b:1},
		output: 'true'
	},
	{
		template: '{{isntLike a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{isntLike a b}}',
		input: {a:'2', b:2},
		output: ''
	},
	{
		template: '{{isntLike a b}}',
		input: {a:'2', b:'1'},
		output: 'true'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:1},
		output: 'yes'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:2},
		output: 'no'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:2, b:'2'},
		output: 'no'
	},
	{
		template: '{{#isntLike a b}}yes{{else}}no{{/isntLike}}',
		input: {a:'2', b:'1'},
		output: 'yes'
	}
]);

exports['lt'] = makeTests([
	{
		template: '{{lt a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{lt a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{lt a b}}',
		input: {a:2, b:2},
		output: ''
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#lt a b}}yes{{else}}no{{/lt}}',
		input: {a:2, b:2},
		output: 'no'
	}
]);

exports['lte'] = makeTests([
	{
		template: '{{lte a b}}',
		input: {a:1, b:2},
		output: 'true'
	},
	{
		template: '{{lte a b}}',
		input: {a:2, b:1},
		output: ''
	},
	{
		template: '{{lte a b}}',
		input: {a:2, b:2},
		output: 'true'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:1, b:2},
		output: 'yes'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:2, b:1},
		output: 'no'
	},
	{
		template: '{{#lte a b}}yes{{else}}no{{/lte}}',
		input: {a:2, b:2},
		output: 'yes'
	}
]);

exports['or'] = makeTests([
	{
		template: '{{or a b c}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{or a b}}',
		input: {a:0, b:1},
		output: '1'
	},
	{
		template: '{{or a b}}',
		input: {a:'0', b:'1'},
		output: '0'
	},
	{
		template: '{{or a}}',
		input: {a:1, b:2, c:0},
		output: '1'
	},
	{
		template: '{{or c}}',
		input: {a:1, b:2, c:0},
		output: '0'
	},
	{
		template: '{{or "<div>"}}',
		output: '&lt;div&gt;'
	},
	{
		template: '{{{or "<div>"}}}',
		output: '<div>'
	},
	{
		template: '{{#or a b c}}content{{/or}}',
		input: {a:1, b:2, c:0},
		output: 'content'
	},
	{
		template: '{{#or a b}}content{{/or}}',
		input: {a:0, b:0},
		output: ''},
	{
		template: '{{#or a b}}content{{else}}other content{{/or}}',
		input: {a:0, b:''},
		output: 'other content'
	},
	{
		template: '{{#or a}}content{{/or}}',
		input: {a:1, b:2},
		output: 'content'
	}
]);