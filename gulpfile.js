var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var optimzeJs = require('gulp-optimize-js');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');

var scripts = [
    './js/lib/jquery-2.1.4.min.js',
    './js/lib/bootstrap.min.js',
    './js/lib/jrss.js',
    './js/lib/jfeed.js',
    './js/lib/jfeeditem.js',
    './js/lib/jquery.simpleWeather.min.js',
    './js/*'
];

var cssFiles = [
    './css/*'
];

var htmlFiles = [
    'index.html'
];

gulp.task('uglyScripts', function() {
    return gulp.src(scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(optimzeJs())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglyCSSFiles', function () {
    return gulp.src(cssFiles)
        .pipe(concatCss("all.css"))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglyHTML', function() {
    return gulp.src(htmlFiles)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('cssFiles', function () {
    return gulp.src(cssFiles)
        .pipe(concatCss("all.css"))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
    return gulp.src(htmlFiles)
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['scripts', 'cssFiles', 'html'], function() {
    gulp.watch(scripts.concat(cssFiles).concat(htmlFiles), ['dev'])
});

gulp.task('dev', ['html', 'cssFiles', 'scripts']);

gulp.task('default', ['uglyScripts', 'uglyCSSFiles', 'uglyHTML']);