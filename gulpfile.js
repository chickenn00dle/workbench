var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify');

gulp.task('coffee', function(){
    gulp.src('components/coffee/*.coffee')
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
    gulp.src('components/scripts/*.js')
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
    gulp.watch('components/coffee/*.coffee', ['coffee']);
    gulp.watch('components/scripts/*.js', ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);
