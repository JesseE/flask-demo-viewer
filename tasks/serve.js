var gulp = require('gulp');
var connect = require('gulp-connect');
var config = require('../config');
var paths = config.paths;
var _path = require('path');

/**
 * Starts server
 */
gulp.task('serve', function() {
	connect.server({
		root: _path.resolve(paths.dist),
		port: config.port
	});
});
