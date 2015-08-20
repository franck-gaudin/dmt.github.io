module.exports = function(grunt){
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({ 

    jshint: {
      ignore_warning: {
        options: {
          '-W083': true,
          '-W120' : false,
        },
        src: [
          'src/js/main.js',
          'src/js/classie.js'
        ],
      },
    },

    uglify: {
      dist: {
        files: {
          'js/main.min.js': [
            'src/js/main.js'
          ]
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expand',
          sourcemap: 'none'
        },
        files: {
          'css/dmt.styles.css': 'src/sass/dmt.styles.scss'
        }
      }
    },

    cssmin: {
      dist: {
        expand: true,
        cwd: 'css/',
        src: ['dmt.styles.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.styles.min.css'
      }
    },

    imagemin: {                          // Task 
      dist: {                            // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          cwd: 'src/',                   // Src matches are relative to this path 
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
          dest: ''                // Destination path prefix
        }]
      }
    },

    critical: {
      dist: {
        options: {
          base: './',
          dimensions: [{
            width: 1024,
            height: 900
          },
            {
              width: 500,
              height: 900
            }]
        },
        files: [
          {src: ['index.html'], dest: 'result.html'}
        ]
      }
    },

    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify' ],
        options: {
          spawn: false,
        },
      },
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
    }

  });


  // ========= // CREATE TASKS =========

  // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'sass', 'imagemin']);

};