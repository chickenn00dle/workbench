var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
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
});

gulp.task('default', ['coffee', 'js', 'compass']);
