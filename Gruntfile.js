var basePath = 'public';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            css: {
                files: [basePath + '/scss/**/*.scss'],
                tasks: ['sass'],
                // tasks: ['sass', 'cssmin'],
                options: {
                    spawn: false,
                },
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: basePath + '/css',
                    src: ['*.css', '!*.min.css'],
                    dest: basePath + '/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            plugins: {
                files: {
                    'public/js/plugins.min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/popper.js/dist/umd/popper.min.js',
                        'node_modules/bootstrap/dist/js/bootstrap.min.js',
                        'node_modules/slick-carousel/slick/slick.min.js',
                        'node_modules/bs-custom-file-input/dist/bs-custom-file-input.min.js',
                        'node_modules/noty/lib/noty.min.js',
                        'node_modules/mo-js/build/mo.min.js',
                        basePath + '/lib/cookieconsent.min.js',
                        basePath + '/lib/leaflet/leaflet-src.js',
                    ]
                }
            },
            my_target: {
                files: {
                    'public/js/main.min.js':
                        [basePath + '/js/main.js']
                },
                compress: true
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: basePath + '/scss/',
                    src: ['**/*.scss'],
                    dest: basePath + '/css/',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts/',
                        src: ['**'],
                        dest: 'public/fonts/fontawesome',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/mo-js',
                        src: ['**'],
                        dest: 'public/lib/mo-js',
                        filter: 'isFile'
                    }
                ],
            },
        },
    })
    ;

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify','copy']);

    grunt.registerTask('compile', ['sass', 'cssmin', 'uglify','copy']);
};
