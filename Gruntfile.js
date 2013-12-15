/*
 * chaos-monkey-browser
 * Copyright (c) 2013 Travis Hilterbrand, contributors
 * Licensed under the MIT license.
 */
 module.exports = function(grunt) {
  "use strict";

  var srcPath = 'src/';
  var releasePath = '';

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js',
        '<config:nodeunit.tests>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // release / minimization
    uglify: {
      options: {
        mangle: true
      },
      core: {
        src: srcPath+"chaos-monkey-browser.js",
        dest: releasePath+"chaos-monkey-browser.min.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Tasks
  grunt.registerTask('release', ['uglify']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'release']);
};
