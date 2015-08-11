module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            authModule: {
                src: 'src/templates/**.html',
                dest: 'tmp/templates.js',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/js/auth.mod.js', 'src/js/auth.svc.js', 'src/js/auth.ctrl.js', 'src/js/auth.dir.js', 'tmp/templates.js'],
                dest: 'dist/ngcrud-auth.min.js'
            }
        },
        concat: {
            dist: {
                src: ['src/js/auth.mod.js', 'src/js/auth.svc.js', 'src/js/auth.ctrl.js', 'src/js/auth.dir.js', 'tmp/templates.js'],
                dest: '../ShoppingCart/ShoppingCart/MPShoppingCart.web/src/main/webapp/src/shared/js/ngcrud-auth.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['ngtemplates', 'uglify']);

    grunt.registerTask('dev', ['ngtemplates', 'concat']);

};