var gulp = require('gulp');
var config = require('../config');
var paths = config.paths;
var sequence = require('../lib/sequence');
var critical = require('critical').stream;
var rename = require('gulp-rename');
var include = require('gulp-include');
var replace = require('gulp-replace');

gulp.task('critical', function(cb) {
	sequence(['critical:build', 'critical:inline'], cb);
});

gulp.task('critical:build', function () {
	return gulp.src(paths.dist + '**/*.html', {base: paths.dist})
		.pipe(critical({
			base: paths.dist,
			css: [paths.distAssets + 'css/main.css'],
			width: 1080,
			height: 1000,
			inline: false,
			minify: true,
			ignore: ['@font-face', /\.fonts-loaded(\s)*.*/],
			ignoreOptions: {
				matchSelectors: true
			}
		}))
		.pipe(rename(function (path) {
			console.log('Generating critical css for ' + path.dirname + '/' + path.basename + '.html');
			path.basename += '-critical';
		}))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('critical:inline', ['html'], function() {
	var includeString = '<!-- INCLUDE_CRITICAL_CSS -->';
	var re = new RegExp(includeString, 'gm');

	return gulp.src(paths.dist + '**/*.html')
		.pipe(replace(re, '<style>\n/*=include index-critical.css */\n</style>'))
		.pipe(include())
		.pipe(gulp.dest(paths.dist));
});
