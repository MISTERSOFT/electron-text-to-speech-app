var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// paths folder
var appFilePath = './src/';
var nodeModulesPath = './node_modules/';
var distFolder = appFilePath + 'electron/public/';
//files name
var jsBuildFile = 'build.js';
var cssBuildFile = 'build.css';

gulp.task('js', function() {
    return gulp.src([
        // nodeModulesPath + 'jquery/dist/jquery.js',
        // nodeModulesPath + 'bootstrap/dist/js/bootstrap.js',
        nodeModulesPath + 'angular/angular.js',
        nodeModulesPath + 'angular-route/angular-route.js',
        appFilePath + 'app/**/*.module.js',
        appFilePath + 'app/**/*.js',
    ])
    .pipe(concat(jsBuildFile))
    .pipe(gulp.dest(distFolder + 'js/'));
});

gulp.task('css', function() {
    return gulp.src([
        nodeModulesPath + 'bootstrap/dist/css/bootstrap.css',
        appFilePath + 'styles.css'
    ])
    .pipe(concat(cssBuildFile))
    .pipe(gulp.dest(distFolder + 'css/'));
});

gulp.task('templates', function() {
    return gulp.src([
        appFilePath + 'app/**/*.html'
    ])
    .pipe(gulp.dest(distFolder + 'templates/'));
});

gulp.task('fonts', function() {
    return gulp.src([
        nodeModulesPath + 'bootstrap/dist/fonts/*.*'
    ])
    .pipe(gulp.dest(distFolder + 'fonts/'));
});

gulp.task('build-dev', ['css', 'fonts', 'js', 'templates'], function() {
    // copy index.html into the public folder
    gulp.src(appFilePath + 'index.html')
        .pipe(gulp.dest(distFolder));
    
    // Inject CSS and JS files into the index.html createed before
    return gulp.src(distFolder + 'index.html')
        .pipe(inject(gulp.src(distFolder + 'css/' + cssBuildFile), {relative: true}))
        .pipe(inject(gulp.src(distFolder + 'js/' + jsBuildFile), {relative: true}))
        .pipe(gulp.dest(distFolder));
});