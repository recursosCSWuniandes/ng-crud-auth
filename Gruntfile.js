module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        ngtemplates: 'grunt-angular-templates'
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/**/*.mod.js',
                    'src/**/*.js'
                ],
                dest: 'tmp/ngcrud-auth.js'
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
                dest: '<%= concat.dist.dest %>'
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
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            dev: {
                options: {
                    base: 'tmp'
                }
            }
        },
        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['dev']
            }
        }
    });

    grunt.registerTask('default', ['concat', 'ngtemplates:dist', 'uglify']);

    grunt.registerTask('dev', ['concat', 'ngtemplates:dev']);

    grunt.registerTask('serve', ['dev', 'connect:dev', 'watch']);

};
