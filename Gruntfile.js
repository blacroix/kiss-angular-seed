'use strict';

var vendor = [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-resource/angular-resource.js'
];

var source = [
    'app/**/*.js'
];

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {

            dist: {
                files: [
                    {
                        src: ['style/app.sass'],
                        dest: '.',
                        expand: true,
                        ext: '.css'
                    }
                ]
            }

        },

        writefile: {

            options: {
                paths: {
                    vendor: vendor,
                    source: source
                }
            },

            index: {
                src: 'index.html.hbs',
                dest: 'index.html'
            }

        },

        watch: {

            sass: {
                files: '**/*.sass',
                tasks: ['sass']
            },

            source: {
                files: source,
                tasks: ['writefile']
            },

            vendor: {
                files: vendor,
                tasks: ['writefile']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'index.html',
                    'style/app.css',
                    'app/**/*.js',
                    'app/**/*.html'
                ]
            }

        },

        connect: {

            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },

            livereload: {
                options: {
                    open: true,
                    base: [
                        '.'
                    ]
                }
            }

        },

        clean: {
            dist: ['dist']
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'index.html',
                            'app/**/*.html',
                            'style/app.css'
                        ].concat(
                            vendor,
                            source
                        ),
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        'gh-pages': {
            options: {
                base: 'dist',
                add: true
            },
            src: ['**']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-writefile');

    grunt.registerTask('default', ['sass', 'writefile', 'connect:livereload', 'watch']);
    grunt.registerTask('dist', ['sass', 'writefile', 'clean:dist', 'copy:dist']);
    grunt.registerTask('deploy', ['dist', 'gh-pages']);

};