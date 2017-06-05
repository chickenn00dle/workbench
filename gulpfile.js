var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/*.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

gulp.task('coffee', function(){
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('html', function(){
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('json', function(){
    gulp.src(jsonSources)
        .pipe(connect.reload())
});

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
});

gulp.task('compass', function(){
    gulp.src('components/sass/style.scss')
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/img',
            style: 'expanded'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())
});

gulp.task('connect', function(){
    connect.server({
        root: 'builds/development',
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
