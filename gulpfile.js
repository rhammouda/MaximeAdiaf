var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var rename = require('gulp-rename');


//CSS
gulp.task('sass', function(done) {
  gulp.src('./style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./'))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./'))
    .on('end', done);
});


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing:  {
      enable: true,
      path: './',
      options: undefined
    },
      open: true,
    fallback: './index.html',
    }));
});

gulp.task('watch', function() {
  gulp.watch('./*.scss',gulp.series('sass'));
});

gulp.task('serve', gulp.parallel('sass','webserver','watch'));



