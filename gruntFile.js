module.exports = function (grunt) {
  "use strict";

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Default task.
  grunt.registerTask('default', ['jshint', 'html2js', 'recess', 'build', 'karma']);

  var testConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    meta: {
      modules: 'angular.module("AngularBlackBelt", [<%= srcModules %>]);',
      tplmodules: 'angular.module("AngularBlackBelt.tpls", [<%= tplModules %>]);',
      all: 'angular.module("AngularBlackBelt", ["AngularBlackBelt.tpls", <%= srcModules %>]);'
    },
    src: {
      html: ['demo/index.html'],
      less: ['less/*.less'] // recess:build doesn't accept ** in its file patterns
    },
    modules: [],
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    filename: 'AngularBlackBelt',
    filenamecustom: '<%= filename %>-custom',
    watch: {
      html: {
        files: ['directives/**/*.tpl.html','directives/**/demo/*.tpl.html'],
        tasks: []
      },
      js: {
        files: ['directives/**/*.js','directives/**/demo/*.js', '!directives/**/*.html.js','!directives/**/demo/*.html.js'],
        tasks: ['recess', 'html2js', 'build']
      }
    },
    karma: {
      unit: {
        options: testConfig('karma.conf.js')
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= meta.modules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
      }
    },
    html2js: {
      dist: {
        options: {
          module: null, // no bundle module for all the html2js templates
          base: '.'
        },
        files: [{
          expand: true,
          src: ['directives/**/**/*.tpl.html'],
          ext: '.html.js'
        }]
      }
    },
    jshint:{
      files:['directives/**/**/*.js', 'test/**/*.js', 'demo/**/*.js'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        expr: {
          ExpressionStatements: true
        },
        globals:{}
      }
    },
    recess: {
      build: {
        files: {
          '<%= dist %>/<%= pkg.name %>.css':
          ['<%= src.less %>'] },
        options: {
          compile: true
        }
      }
    },
    browserSync: {
        dev: {
            bsFiles: {
                src : ['<%= dist %>/<%= filename %>-<%= pkg.version %>.js','<%= dist %>/<%= pkg.name %>.css']
            }
        }
    },
    // Configuration to be run (and then tested).
    protractor: {
      options: {
        keepAlive: false
      },
      testTargetConfigFile: {
        configFile:"tests/e2e.conf.js",
      }
    }
  });

  grunt.registerTask('dist', 'Override dist directory', function() {
    var dir = this.args[0];
    if (dir) { grunt.config('dist', dir); }
  });

  grunt.registerTask('build', 'Create Anugular Black Belt build files', function() {
    var _ = grunt.util._;

    var foundModules = {};
    function findModule(name) {
      if (foundModules[name]) { return; }
      foundModules[name] = true;

      function breakup(text, separator) {
        return text.replace(/[A-Z]/g, function (match) {
          return separator + match;
        });
      }
      function ucwords(text) {
        return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
          return $1.toUpperCase();
        });
      }
      function enquote(str) {
        return '"' + str + '"';
      }

      function dependenciesForModule(name) {
        var deps = [];
        grunt.file.expand('directives/' + name + '/*.js')
        .map(grunt.file.read)
        .forEach(function(contents) {
          //Strategy: find where module is declared,
          //and from there get everything inside the [] and split them by comma
          var moduleDeclIndex = contents.indexOf('angular.module(');
          var depArrayStart = contents.indexOf('[', moduleDeclIndex);
          var depArrayEnd = contents.indexOf(']', depArrayStart);
          var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
          dependencies.split(',').forEach(function(dep) {
            if (dep.indexOf('AngularBlackBelt.') > -1) {
              var depName = dep.trim().replace('AngularBlackBelt.','').replace(/['"]/g,'');
              if (deps.indexOf(depName) < 0) {
                deps.push(depName);
                //Get dependencies for this new dependency
                deps = deps.concat(dependenciesForModule(depName));
              }
            }
          });
        });
        return deps;
      }

      var module = {
        name: name,
        moduleName: enquote('AngularBlackBelt.' + name),
        displayName: ucwords(breakup(name, ' ')),
        srcFiles: grunt.file.expand("directives/"+name+"/*.js"),
        tplFiles: grunt.file.expand("directives/"+name+"/*.tpl.html"),
        tpljsFiles: grunt.file.expand("directives/"+name+"/*.tpl.html.js"),
        tplModules: grunt.file.expand("dist/directives/"+name+"/*.tpl.html").map(enquote),
        dependencies: dependenciesForModule(name)
      };
      module.dependencies.forEach(findModule);
      grunt.config('modules', grunt.config('modules').concat(module));
    }

    grunt.file.expand({
      filter: 'isDirectory', cwd: '.'
    }, 'directives/*').forEach(function(dir) {
      findModule(dir.split('/')[1]);
    });

    grunt.file.expand({
      filter: 'isDirectory', cwd: '.'
    }, 'directives/demo/*').forEach(function(dir) {
      findModule('demo/'+ dir.split('/')[2]);
    });

    var modules = grunt.config('modules');
    grunt.config('srcModules', _.pluck(modules, 'moduleName'));
    grunt.config('tplModules', _.pluck(modules, 'tplModules').filter(function(tpls) { return tpls.length > 0;} ));

    var srcFiles = _.pluck(modules, 'srcFiles');
    var tpljsFiles = _.pluck(modules, 'tpljsFiles');
    //Set the concat task to concatenate the given src modules
    grunt.config('concat.dist.src', grunt.config('concat.dist.src')
                 .concat(srcFiles));

    grunt.task.run(['concat']);
  });

};