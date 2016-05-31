var gulp = require('gulp');
var runSequence = require('run-sequence');
var taskListing = require('gulp-task-listing');

// Get tasks from tasks directory
require('require-dir')('tasks');

var allTasks = [
	'styles',
	'scripts',
	'html'
	//'assets',
	//'images'
];

gulp.task('default', taskListing.withFilters(null, 'default'));

gulp.task('build', function() {
	runSequence(
		'clean',
		allTasks,
		'critical',
		'revision');
});

gulp.task('develop', function() {
	return runSequence('clean', allTasks);
});
