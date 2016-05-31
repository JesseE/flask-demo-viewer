var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var paths = config.paths;

/**
 * Cleans the build (meaning: deletes dist folder)
 */
gulp.task('clean', function(cb) {
	return del(paths.dist)
});
