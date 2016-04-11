"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs Local webserver
var open = require('gulp-open'); // Open a URL in Web Browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS files and JSX files

var config = {
  port: 9009,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
}

//Start a local development server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open('', { url: config.devBaseUrl + ':' + config.port + '/'}));
});

// Fetch all HTML Files in the /src directory and store it in /dist directory
// and restart connect devserver
gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload() );
});

// Transforms JSX to JS and bundles into one file bundle.js,
// publishes error on console(if any)
gulp.task('js', function() {
  browserify(config.paths.mainJs)
  .transform(reactify)
  .bundle()
  .on('error', console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(connect.reload());
});

// Concatenates CSS files and puts in bundle.css and drops it in /dist directory
gulp.task('css', function() {
  gulp.src(config.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Migrates images to dist directory
// Note that images can also be optimized here
gulp.task('images', function() {
  gulp.src(config.paths.images)
  .pipe(gulp.dest(config.paths.dist + '/images'))
  .pipe(connect.reload());

  //publish favicon
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

// ESLints JS and JSX files as per provided rules and serves the output
gulp.task('lint', function() {
  return gulp.src(config.paths.js)
  .pipe(lint({config: 'eslint.config.json'}))
  .pipe(lint.format());
});

// Watch task to render new HTML if changed
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

//Default task
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
