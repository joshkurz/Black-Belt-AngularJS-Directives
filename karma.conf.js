// Contents of: config/karma.conf.js
module.exports = function (config) {
  config.set({
    basePath : '',
    files : [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'directives/**/*.js',
        'directives/**/tests/*.spec.js',
        'directives/**/*.tpl.html'
    ],

    singleRun : true,

    browsers : ['Chrome'],

    frameworks : ["jasmine"],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit'
    reporters : ['progress']

  });
};