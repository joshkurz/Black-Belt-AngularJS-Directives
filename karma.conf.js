// Contents of: config/karma.conf.js
module.exports = function (config) {
  config.set({
    basePath : '',
    files : [
        'bower_components/jquery/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'vendor/mediaelement/mediaelement-and-player.js',
        'vendor/flowplayer/flowplayer-3.2.13.min.js',
        'dist/*.js',
        'directives/**/tests/*.spec.js'
    ],

    singleRun : true,

    browsers : ['Chrome'],

    frameworks : ["jasmine"],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters : ['progress']

  });
};