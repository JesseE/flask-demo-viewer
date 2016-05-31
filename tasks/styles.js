var gulp = require('gulp');
var del = require('del');
var sequence = require('../lib/sequence');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config');
var paths = config.paths;
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var gulpif = require('gulp-if');

gulp.task('styles', function(cb) {
	sequence(['styles:clean','styles:build'], cb);
});

gulp.task('styles:watch', function() {
	gulp.watch(paths.src + '**/*.less', ['styles']);
});

// Delete any files currently in the scripts destination path
gulp.task('styles:clean', function(cb) {
	return del([paths.dist + '**/*.css'], {dot: true})
});

gulp.task('styles:build', function() {
	var environment = process.env.NODE_ENV;

	return gulp.src(paths.src + 'main.less')
		.pipe(plumber())
		.pipe(gulpif(environment !== 'production', sourcemaps.init()))
		.pipe(less())
		.on('error', function(error) {
			console.error(error.message);
			this.emit('end');
		})
		.pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'] }))
		.pipe(gulpif(environment === 'production', minifyCSS()))
		.pipe(gulpif(environment !== 'production', sourcemaps.write('./')))
		.pipe(gulp.dest(paths.dist + 'assets/css/'));
});
