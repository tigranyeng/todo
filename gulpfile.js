var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css');
 
gulp.task('default', function () {
  return gulp.src('*.css')
    .pipe(concatCss("gulp.css"))
    .pipe(minifyCSS())
    .pipe(rename('gulp.min.css'))
    .pipe(gulp.dest('gulp/css'))
    
});

gulp.task('js', function(){
    return gulp.src('toDoController.js')
    	.pipe(concat('all.js'))
        .pipe(rename('gulp.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('gulp/js'));
});


 


gulp.task('watch', function() {
    gulp.watch('*.css', ['default']);
    gulp.watch('*.js', ['js']);
});
