'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var path = require('path');


var UIGenerator = yeoman.generators.Base.extend({
  prompting: function () {
     var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-ui-angular') + ' generator! Out of the box I include HTML5 Boilerplate, AngularJS, jQuery, Sass, Bootstrap and with gulp task runner '
    ));

    var prompts = [{
      name: 'name',
      message: 'What is your app\'s name? (No space between app\'s name instead use Hyphen symbol)',
      default: this.appname
    },
    {
      type: 'checkbox',
      name: 'framework',
      message: 'Select the following framework you need to install ?',
      choices: [{
                name: 'Angular',
                value: 'includeAngular',
                checked: true
              }, {
                name: 'JQuery',
                value: 'includeJQuery',
                checked: true
              }]
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more front-end features would you like ?',
      choices: [{
                   name: 'Sass',
                   value: 'includeSass',
                   checked: true
              }, 
              {
                  name: 'Bootstrap',
                  value: 'includeBootstrap',
                  checked: true
              }, 
              {
                  name: 'Modernizr',
                  value: 'includeModernizr',
                  checked: false
                },
                {
                  name: 'UI Bootstrap Angular',
                  value: 'includeUIBootstrap',
                  checked: false
                },
                {
                  name: 'Font Awesome',
                  value: 'includeFontAwesome',
                  checked: false
                },
                {
                  name: 'UI Router Angular',
                  value: 'includeUIRouter',
                  checked: true
                }]
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.name = props.name;
      var framework = props.framework;
      var features = props.features;
      var hasFeature = function (feat) {
       return features.indexOf(feat) !== -1;
      };
      var hasMainframeworks = function (mainframework) {
         return framework.indexOf(mainframework) !== -1;
      };

    // manually deal with the response, get back and store the results.
      this.includeSass = hasFeature('includeSass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeUIBootstrap = hasFeature('includeUIBootstrap');
      this.includeFontAwesome = hasFeature('includeFontAwesome');
      this.includeUIRouter = hasFeature('includeUIRouter');
      this.includeAngular = hasMainframeworks('includeAngular');
      this.includeJQuery = hasMainframeworks('includeJQuery');
      this.date = new Date().toDateString();
      this.version = '1.0.0'
      done();
    }.bind(this));
  },

  writing:{
    //Copy configration files
     config:  function (){
          this.fs.copyTpl(
              this.templatePath('package.json'),
              this.destinationPath('package.json'), {
                  name: this.name,
                  includeSass: this.includeSass
              }
          );
          this.fs.copyTpl(
              this.templatePath('gulpfile.js'),
              this.destinationPath('gulpfile.js'), {
                  name: this.name,
                  includeSass: this.includeSass,
                  includeBootstrap: this.includeBootstrap,
                  includeModernizr: this.includeModernizr,
                  includeUIBootstrap: this.includeUIBootstrap,
                  includeFontAwesome: this.includeFontAwesome,
                  includeUIRouter: this.includeUIRouter,
                  includeAngular: this.includeAngular,
                  includeJQuery: this.includeJQuery,
                  date: this.date,
                  version: this.version
              }
          );
           this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc')
          );
        },

        //Copy application files
        app: function() {
          //index.html
          this.fs.copyTpl(
            this.templatePath('app/index.html'),
            this.destinationPath('app/index.html'),{
                  name: this.name,
                  includeAngular: this.includeAngular
            }
          );
          //app.js
          if (this.includeAngular) {
          this.fs.copy(
            this.templatePath('app/app.js'),
            this.destinationPath('app/app.js'));
          } else{
            this.fs.copy(
            this.templatePath('app/_app.js'),
            this.destinationPath('app/app.js'));
          }
          // styles
          this.fs.copy(
            this.templatePath('app/styles/constant.scss'),
            this.destinationPath('app/styles/constant.scss'));
          // Views
          this.fs.copy(
            this.templatePath('app/views/readme.txt'),
            this.destinationPath('app/views/readme.txt')
          );
          // scripts
          if (this.includeAngular) {
          // scripts components
          this.fs.copy(
            this.templatePath('app/scripts/components/readme.txt'),
            this.destinationPath('app/scripts/components/readme.txt')
          );
          // scripts controllers
          this.fs.copy(
            this.templatePath('app/scripts/controllers/readme.txt'),
            this.destinationPath('app/scripts/controllers/readme.txt')
          );
          // scripts contants
          this.fs.copy(
            this.templatePath('app/scripts/contants/readme.txt'),
            this.destinationPath('app/scripts/contants/readme.txt')
          );
          // scripts directives
          this.fs.copy(
            this.templatePath('app/scripts/directives/readme.txt'),
            this.destinationPath('app/scripts/directives/readme.txt')
          );
          // scripts factory
          this.fs.copy(
            this.templatePath('app/scripts/factory/readme.txt'),
            this.destinationPath('app/scripts/factory/readme.txt')
          );
          // scripts filters
          this.fs.copy(
            this.templatePath('app/scripts/filters/readme.txt'),
            this.destinationPath('app/scripts/filters/readme.txt')
          );
          // scripts services
          this.fs.copy(
            this.templatePath('app/scripts/services/readme.txt'),
            this.destinationPath('app/scripts/services/readme.txt')
          ); } else{
          // scripts 
          this.fs.copy(
            this.templatePath('app/scripts/readme.txt'),
            this.destinationPath('app/scripts/readme.txt')
          );
          }
          // images
          this.fs.copy(
            this.templatePath('app/images/ui-angular.jpg'),
            this.destinationPath('app/images/ui-angular.jpg')
          );          
        },

        bower: function () {
        var bower = {
          name: this.name,
          private: true,
          description: "this project is to test gulp envinorment",
          main: "index.js",
          authors: [
            "Rajkumar"
          ],
          license: "MIT",
          moduleType: [],
          homepage: "",
          ignore: [
            "**/.*",
            "node_modules",
            "bower_components",
            "test",
            "tests"
          ],
          dependencies: {}
        };
        if (this.includeBootstrap) {
          bower.dependencies.bootstrap = '^3.3.6';
        }
        if (this.includeModernizr) {
          bower.dependencies.modernizr = '~2.8.1';
        }
        if (this.includeAngular) {
          bower.dependencies.angular = '^1.5.3';
        }
        if (this.includeJQuery) {
          bower.dependencies.jquery = '^2.2.3';
        }
        if (this.includeFontAwesome) {
          var FontAwesome = "font-awesome";
          bower.dependencies.FontAwesome = 'FortAwesome/Font-Awesome#^4.5.0';
        }
        if (this.includeUIBootstrap) {
          var AngularBootstrap = "angular-bootstrap";
          bower.dependencies.angularbootstrap = 'angular-bootstrap#^1.3.3';
        }     
        if (this.includeUIRouter) {
          var AngularUIRouter = "angular-ui-router";
          bower.dependencies.angularuirouter = 'angular-ui-router#^0.3.1';
        }     
          this.write('bower.json', JSON.stringify(bower, null, 2));
        }

 },

  install: function () {
    this.installDependencies();
  }
});


module.exports = UIGenerator;