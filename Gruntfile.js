module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        ngtemplates: 'grunt-angular-templates'
    });

    var appConfig = {
        src: 'src',
        tmp: '.tmp',
        dist: 'dist'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: appConfig,
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= meta.tmp %>',
                        '<%= meta.dist %>/{,*/}*',
                        '!<%= meta.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '<%= meta.tmp %>'
        },
        concat: {
            dist: {
                src: [
                    '<%= meta.src %>/**/*.mod.js',
                    '<%= meta.src %>/**/*.js'
                ],
                dest: '<%= meta.dist %>/csw-ng-auth.js'
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
                src: '<%= meta.src %>/templates/**/*.html',
                dest: '<%= concat.dist.dest %>'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= meta.dist %>/csw-ng-auth.min.js'
            }
        },
        connect: {
            options: {
                port: 9001,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            dev: {
                options: {
                    base: '<%= meta.dist %>'
                }
            }
        },
        watch: {
            js: {
                files: ['<%= meta.src %>/**/*.js'],
                tasks: ['dev']
            }
        }
    });

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean', 'concat', 'ngtemplates:dist', 'uglify']);

    grunt.registerTask('dev', ['clean', 'concat', 'ngtemplates:dev']);

    grunt.registerTask('serve', ['dev', 'connect:dev', 'watch']);

};
