var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
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
