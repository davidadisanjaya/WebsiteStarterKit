var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

var notify = function(error) {
    var message = 'In: ';
    var title = 'Error: ';

    if(error.description) {
        title += error.description;
    } else if (error.message) {
        title += error.message;
    }

    if(error.filename) {
        var file = error.filename.split('/');
        message += file[file.length-1];
    }

    if(error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }

    notifier.notify({title: title, message: message});
};

gulp.task('serve', function(done) {
    gulp.src('')
        .pipe(server({
            livereload: {
            enable: true,
            filter: function(filePath, cb) {
                if(/main.js/.test(filePath)) {
                    cb(true)
                } else if(/style.css/.test(filePath)){
                    cb(true)
                }
            }
            },
        open: true
    }));
});

gulp.task('webpack', function() {
  return gulp.src('./assets/dev/js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('assets/js/'));
});

gulp.task('sass', function () {
    gulp.src('./assets/dev/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('compress',['webpack'], function() {
  return gulp.src('./assets/dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('default', ['webpack', 'sass', 'watch','compress']);

gulp.task('watch', function () {
    gulp.watch('./assets/dev/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/dev/js/**/*.js', ['webpack','compress']);
});
