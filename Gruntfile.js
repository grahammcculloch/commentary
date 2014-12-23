'use strict';

var paths = {
  js: ['*.js', 'server/**/*.js', 'public/**/*.js', '!bower_components/**'],
  html: ['public/views/**',],
  css: ['!bower_components/**', 'public/assets/**/*.css'],
  sass: ['bower_components/**/*.{scss,sass}', 'sass/*.{scss,sass}']
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assets: grunt.file.readJSON('config/assets.json'),
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: paths.sass,
        tasks: ['sass:dev']
      }
    },
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.css
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: '<%= assets.core.sass %>'
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'server.js'
        ]
      },
      src: ['server/tests/**/*.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  /**
   * Default Task
   */
  grunt.hook.push('concurrent', 9999);
  grunt.hook.push('jshint', -200);
  grunt.hook.push('sass:dev', 100);
  grunt.hook.push('csslint', 200);

  //Default task.
  grunt.registerTask('default', ['hook']);

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest']);

};