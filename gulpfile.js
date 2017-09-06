const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styles', () => {
    return gulp.src('./sass/styles.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'));
})

gulp.task('watch', () => {
    gulp.watch('./sass/**/*.scss', ['styles', 'fonts']);
});

gulp.task('default', ['styles', 'fonts']);