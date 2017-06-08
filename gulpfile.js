var uglify = require('gulp-uglify'),
    jsonminify = require('gulp-json-minify'),
    imagemin = require('gulp-imagemin'),
    HTMLminify = require('gulp-minify-html'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development'){
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/*.coffee'];
jsSources = ['components/scripts/*.js'];
sassSources = ['components/sass/*.scss'];
htmlSources = ['builds/development/*.html'];
jsonSources = ['builds/development/js/*.json'];

gulp.task('coffee', function(){
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

gulp.task('json', function(){
    gulp.src(jsonSources)
        .pipe(gulpif(env === 'production', jsonminify()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
        .pipe(connect.reload())
});

gulp.task('compass', function(){
    gulp.src('components/sass/style.scss')
        .pipe(compass({
            sass: 'components/sass',
            style: sassStyle,
            image: outputDir + 'img'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('html', function(){
    gulp.src(htmlSources)
        .pipe(gulpif(env === 'production', HTMLminify()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
        .pipe(connect.reload())
});

gulp.task('imagemin', function(){
    gulp.src('builds/development/img/**/*.*')
        .pipe(gulpif(env === 'production', imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ])))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
        .pipe(connect.reload())
});

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
    gulp.watch('builds/development/img/**/*.*', ['imagemin']);
});

gulp.task('default', ['coffee', 'js', 'json', 'compass', 'html', 'imagemin', 'connect', 'watch']);
