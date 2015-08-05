module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            authModule: {
                src: 'src/templates/**.html',
                dest: 'tmp/templates.js',
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeComments:                 true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/js/auth.mod.js','src/js/auth.svc.js','src/js/auth.ctrl.js','tmp/templates.js'],
                dest: 'dist/ngcrud-auth.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['ngtemplates', 'uglify']);

};