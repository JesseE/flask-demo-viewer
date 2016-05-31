var gulp = require('gulp');
var del = require('del');
var sequence = require('../lib/sequence');
var config = require('../config');
var paths = config.paths;
var newer = require('gulp-newer');

gulp.task('assets', function(cb) {
	sequence(['assets:clean', 'assets:build', 'assets:favicons'], cb);
});

gulp.task('assets:watch', function() {
	gulp.watch(paths.assets, ['assets:build']);
});

// Delete any files currently in the scripts destination path
gulp.task('assets:clean', function(cb) {
	return del([paths.dist + 'assets', paths.dist + '.htaccess'], {dot: true})
});

/**
 * Copies new(er) files in assets folder to dist folder
 *
 * - Newer  Checks source file’s modified date against same file in dist folder.
 *      This lightens the load during the build and, more importantly,
 *      the watch task.
 *
 * @return {Stream}
 */
gulp.task('assets:build', function() {
	return gulp.src(paths.assets, {base: paths.src})
		.pipe(newer(paths.dist + 'assets/'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('assets:favicons', function() {
	return gulp.src(paths.favicons)
		.pipe(gulp.dest(paths.dist));
});
