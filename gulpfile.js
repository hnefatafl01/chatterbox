const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styles', () => {
    return gulp.src('./sass/styles.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', () => {
    gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('default', ['styles']);