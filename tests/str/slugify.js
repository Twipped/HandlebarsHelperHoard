
var makeTests = require('../testBuilder.js');

module.exports = makeTests([
	{
		template: '{{slugify a}}',
		input: {a:'Perché l\'erba è verde?'},
		output: 'perche-l-erba-e-verde'
	},
	{
		template: '{{slugify a}}',
		input: {a:'Tänk efter nu – förr\'n vi föser dig bort '},
		output: 'tank-efter-nu-forr-n-vi-foser-dig-bort'
	},
	{
		template: '{{slugify a}}',
		input: {a:'You+can|use/spaces\\for/the delimiter'},
		output: 'you-can-use-spaces-for-the-delimiter'
	},
	{
		template: '{{slugify a}}',
		input: {a:'A_MiXeD-separator + delimiter/example'},
		output: 'a_mixed-separator-delimiter-example'
	},
	{
		template: '{{slugify a}}',
		input: {a:'аз буки веди'},
		output: 'az-buki-vedi'
	},
	{
		template: '{{slugify a}}',
		input: {a:'рцы слово твердо'},
		output: 'rtsi-slovo-tverdo'
	},
	{
		template: '{{slugify a}}',
		input: {a:'цы червь ша ер ять ю'},
		output: 'tsi-cherv-sha-er-yat-yu'
	},

	{
		template: '{{slugify a}}',
		input: {a:'ΧΕΙΜΕΡΙΝΌΣ, θαλασσινή'},
		output: 'cheimerinos-thalassini'
	},
	{
		template: '{{slugify a}}',
		input: {a:'Δωματίου, ΎΨΟΣ, φιλοξενία'},
		output: 'domatiou-upsos-filoxenia'
	},
	{
		template: '{{slugify a}}',
		input: {a:'ευήλιος, αύρα, ζέστη'},
		output: 'euilios-aura-zesti'
	}
]);
