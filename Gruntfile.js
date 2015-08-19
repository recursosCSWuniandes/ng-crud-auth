module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: '<%= concat.dev.src %>',
                dest: 'tmp/ngcrud-auth.js'
            },
            dev: {
                src: [
                    'src/js/auth.mod.js',
                    'src/js/auth.svc.js',
                    'src/js/auth.ctrl.js',
                    'src/js/auth.dir.js'
                ],
                dest: '../mp-books/MarketPlace.web/src/main/webapp/src/utils/ngcrud-auth.min.js'
            }
        },
        ngtemplates: {
            options: {
                module: 'authModule',
                append: true
            },
            dist: {
                src: '<%= ngtemplates.dev.src %>',
                dest: '<%= concat.dist.dest %>',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true
                    }
                }
            },
            dev: {
                src: 'src/templates/**.html',
                dest: '<%= concat.dev.dest %>'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/ngcrud-auth.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat:dist', 'ngtemplates:dist', 'uglify']);

    grunt.registerTask('dev', ['concat:dev', 'ngtemplates:dev']);

};
