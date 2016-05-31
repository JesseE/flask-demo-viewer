var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');
var paths = config.paths;
var gulpif = require('gulp-if');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var sequence = require('../lib/sequence');

gulp.task('scripts', function(cb) {
	sequence(['scripts:clean','scripts:build'], cb);
});

gulp.task('scripts:watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
});

// Delete any files currently in the scripts destination path
gulp.task('scripts:clean', function(cb) {
	return del([paths.dist + 'assets/js/*.js'], {dot: true})
});

/**
 * Builds JS and writes to dist folder
 *
 * - ESLint       Lints against .eslintrc rules
 * - Sourcemaps   Writes external source map file in same folder as JS
 * - Concat       Concatenates streams in one output file
 * - Uglify       Uglifies (minification/simplification) JS
 *
 * @return {Stream}
 */
gulp.task('scripts:build', function() {
	var environment = process.env.NODE_ENV;

	return gulp.src(paths.scripts)
		.pipe(eslint())
		.pipe(eslint.format('stylish'))
		.pipe(gulpif(environment !== 'production', sourcemaps.init()))
		.pipe(concat('index.js'))
		.pipe(gulpif(environment === 'production', uglify()))
		.pipe(gulpif(environment !== 'production', sourcemaps.write('./')))
		.pipe(gulp.dest(paths.dist + 'assets/js/'));
});
