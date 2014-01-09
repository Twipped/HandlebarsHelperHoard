
/**
 * GRUNT CONFIGURATION
 */
module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
			all: {
				src: [
					'src/intro.js',
					'src/header.js',
					'src/util.js',
					'src/wrap-pre.js',
					'src/helpers/**/*.js',
					'src/wrap-post.js',
					'src/loader.js',
					'src/footer.js'
				],
				dest: 'build/hhn.all.js',
			},
		},

		uglify: {
			all: {
				options: {
					banner: grunt.file.read('src/intro.js')
				},
				files: {
					'build/hhn.all.min.js': 'build/hhn.all.js'
				}
			}
		},

		nodeunit: {
			all: ['tests/**/*.js', '!tests/testBuilder.js'],
			options: {
				reporter: 'default'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', [
		'concat',
		'nodeunit'
	]);

	grunt.registerTask('default', [
		'concat',
		'nodeunit',
		'uglify'
	]);
};