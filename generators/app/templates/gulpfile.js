// generated on <%= date %> using UI-Generator for <%= name %> <%= version %>
var gulp = require('gulp');<% if (includeSass) { -%>
var sass = require('gulp-sass');<% } -%>
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var del = require('del');
var connect = require('gulp-connect');
var merge = require('merge-stream');


var appScripts = [
<% if (includeAngular) { -%>
  'app/scripts/contants/**/*.js',
  'app/scripts/filters/**/*.js',
  'app/scripts/services/**/*.js',
  'app/scripts/factory/**/*.js',
  'app/scripts/directives/**/*.js',
  'app/scripts/components/**/*.js',
  'app/scripts/controllers/**/*.js',
<% } else { -%>
  'app/scripts/**/*.js',
<% } -%> 
  'app/app.js'
];

<% if (includeSass) { -%>
var appStyles = [
  'app/styles/**.scss'
];<% } else { -%>
var appStyles = [
  'app/styles/**.css'
];<% } -%>

var appImages = [
  'app/images/**/*'
];

var appviews = [
  'app/view/**/*.html'
];

var appFonts = [
<% if (includeFontAwesome) { -%>'app/libs/FontAwesome/fonts/**/*'<% if (includeBootstrap) { -%>,<% } -%><% } -%>
<% if (includeBootstrap) { -%>'app/libs/bootstrap/fonts/**/*'<% } -%>
];

var vendorScripts = [
  <% if (includeJQuery) { -%>'app/libs/jquery/dist/jquery.min.js'<% if (includeAngular || includeUIRouter || includeBootstrap || includeUIBootstrap || includeModernizr) { -%>,<% } -%><% } -%>
  <% if (includeAngular) { -%>'app/libs/angular/angular.min.js'<% if (includeUIRouter || includeBootstrap || includeUIBootstrap || includeModernizr) { -%>,<% } -%><% } -%>
  <% if (includeUIRouter) { -%>'app/libs/angularuirouter/release/angular-ui-router.min.js'<% if (includeBootstrap || includeUIBootstrap || includeModernizr) { -%>,<% } -%><% } -%>
  <% if (includeBootstrap) { -%>'app/libs/bootstrap/dist/js/bootstrap.min.js'<% if (includeUIBootstrap || includeModernizr) { -%>,<% } -%><% } -%>
  <% if (includeUIBootstrap) { -%>'app/libs/angularbootstrap/ui-bootstrap.min.js'<% if (includeModernizr) { -%>,<% } -%><% } -%>
  <% if (includeModernizr) { -%>'app/libs/modernizr/modernizr.js'<% } -%>
];

var vendorStyles = [
<% if (includeFontAwesome) { -%>'app/libs/FontAwesome/css/font-awesome.css'<% if (includeBootstrap || includeAngular || includeUIBootstrap) { -%>,<% } -%><% } -%>
<% if (includeBootstrap) { -%>'app/libs/bootstrap/dist/css/bootstrap.css'<% if (includeAngular || includeUIBootstrap) { -%>,<% } -%><% } -%>
<% if (includeAngular) { -%>'app/libs/angular/angular-csp.css'<% if (includeUIBootstrap) { -%>,<% } -%><% } -%>
<% if (includeUIBootstrap) { -%>'app/libs/angularbootstrap/ui-bootstrap-csp.css'<% } -%>
];

//Start the server
gulp.task('server', ['watch'], function() {
  connect.server({
    root: "www",
    port: 3000
  });
});

// Clean
gulp.task('clean', function(cb) {
  del(['www'], cb);
});


//scripts
gulp.task('scripts', function() {
  gulp.src(appScripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('www/scripts'))
});

// Styles
gulp.task('styles', function() {
  gulp.src(appStyles)
    <% if (includeSass) { -%>.pipe(sass())<% } -%>
    .pipe(minifycss())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('www/assets/styles/'))
});

// Images
gulp.task('images', function() {
  gulp.src(appImages)
    .pipe(gulp.dest('www/assets/images/'))
});

// Fonts
gulp.task('fonts', function() {
  gulp.src(appFonts)
    .pipe(gulp.dest('www/assets/fonts/'))
});

// Vendor
gulp.task('vendors', function() {
  gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('www/scripts'))
  gulp.src(vendorStyles)
    .pipe(minifycss())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('www/assets/styles'))
});

// Views
gulp.task('views', function() {
  gulp.src('app/*.html')
    .pipe(gulp.dest('www/'))
  gulp.src(appviews)
    .pipe(gulp.dest('www/views/'))
});

// Default task
gulp.task('default', function() {
  gulp.start('scripts', 'vendors', 'views', 'styles', 'images', 'fonts', 'default');
});


// Watch
gulp.task('watch', ['default'], function() {

  // Watch .js files
  gulp.watch(appScripts, ['scripts']);
  // Watch vendor .js files
  gulp.watch(vendorScripts, ['vendors']);
  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['www/**']).on('change', livereload.changed);

});