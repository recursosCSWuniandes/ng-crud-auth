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
                src: '<%= meta.src %>/**/*.html',
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
        }
    });

    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean', 'concat', 'ngtemplates:dist', 'uglify']);

    grunt.registerTask('dev', ['clean', 'concat', 'ngtemplates:dev']);
};
