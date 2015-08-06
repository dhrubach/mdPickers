'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

var outputFolder = 'dist/';
var demoAppFolder = 'app/';

gulp.task('lint', function() {
    return gulp.src([
        'gulpfile.js',
        'src/**/*.js'
    ]).pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('assets', function() {
  return gulp.src('src/components/**/*.less')
        .pipe(concat('mdPickers.less'))
        .pipe(less())
        .pipe(gulp.dest(outputFolder))
        .pipe(gulp.dest(demoAppFolder + 'styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(gulp.dest(outputFolder));
});

gulp.task('build-app', function() {
    return gulp.src(['src/mdPickers.js', 'src/components/**/*.js'])
        .pipe(concat('mdPickers.js'))
        .pipe(wrap('(function(window) {\n\'use strict\';\n<%= contents %>\n})(window);'))
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(outputFolder))
        .pipe(gulp.dest(demoAppFolder + 'js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('reload', function() {
    gulp.src(['app/index.html'])
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['src/mdPickers.js', 'src/components/**/*.js'], ['build-app']);
    gulp.watch(['src/components/**/*.less'], ['assets']);
    gulp.watch(['app/index.html', 'app/**/*.js', 'app/**/*.css'], ['reload']);
});

gulp.task('open', ['connect'], function() {
    gulp.src('./app/index.html')
        .pipe(open({
            uri: 'http://localhost:8080'
        }));
});

gulp.task('serve', ['open', 'watch']);

gulp.task('default', ['assets', 'build-app']);
