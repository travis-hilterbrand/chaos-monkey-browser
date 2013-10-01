/*
 * grunt-file-creator
 * Copyright (c) 2012 Travis Hilterbrand, contributors
 * Licensed under the MIT license.
 */

 module.exports = function(grunt) {
  "use strict";

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

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the 'test' task is run, first create some files to be cleaned,
  // then run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
