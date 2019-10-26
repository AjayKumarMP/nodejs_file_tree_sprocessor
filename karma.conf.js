'use strict';

var path = require('path');
var conf = require('./gulp/conf');

function listFiles() {
  return [
    path.join('node_modules/karma-read-json/karma-read-json.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.json'),
    path.join(conf.paths.src, '/**/*.spec.js'),
    path.join(conf.paths.src, '/**/*.mock.js'),
    path.join(conf.paths.src, '/**/*.html')
  ];
}

module.exports = function (config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['ChromeHeadless'],

    reporters : ['progress', 'junit'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test-results.xml'
    }
  };

  config.set(configuration);
};
