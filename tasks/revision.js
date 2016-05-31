var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var sequence = require('../lib/sequence');

var paths = require('../config').paths;
var manifestPath = paths.distAssets + 'rev-manifest.json';

gulp.task('revision', function(cb) {
	sequence(['revision:hash','revision:replace'], cb);
});

gulp.task('revision:hash', function() {
	return gulp.src([
			paths.dist + '**/css/main.css',
			paths.dist + '**/js/index.js'
		])
		.pipe(rev())
		.pipe(gulp.dest(paths.dist))
		.pipe(rev.manifest(manifestPath))
		.pipe(gulp.dest(''));
});

gulp.task('revision:replace', ['revision:hash'], function() {
	return gulp.src(paths.dist + '**/*.html')
		.pipe(revReplace({
			manifest: gulp.src(manifestPath)
		}))
		.pipe(gulp.dest(paths.dist));
});
