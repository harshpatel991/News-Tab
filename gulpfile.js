var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

var scripts = [
    './js/lib/jquery-2.1.4.min.js',
    './js/lib/bootstrap.min.js',
    './js/lib/jrss.js',
    './js/lib/jfeed.js',
    './js/lib/jfeeditem.js',
    './js/lib/jquery.simpleWeather.min.js',
    './js/background.js',
    './js/googleNewsUrlBuilder.js',
    './js/settings.js',
    './js/storageManager.js',
    './js/weather.js'
];

var cssFiles = [
    './css/bootstrap.min.css',
    './css/dark-mode.css',
    './css/weather.css',
    './css/custom.css'
];

gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
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

gulp.task('default', ['scripts', 'cssFiles']);