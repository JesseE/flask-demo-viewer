var gulp = require('gulp');
var del = require('del');
var imagemin = require('gulp-imagemin');
var optipng = require('imagemin-optipng');
var config = require('../config');
var paths = config.paths;
var rename = require('gulp-rename');
var responsive = require('gulp-responsive');
var sequence = require('../lib/sequence');

gulp.task('images', function(cb) {
	sequence(['images:clean',
		'images:copy',
		'images:srcset',
		'images:optimize'], cb);
});

gulp.task('images:clean', function() {
	return del(paths.distImages, {dot: true})
});

/**
 * Optimizes all images and places them in `dist/assets/images`
 */
gulp.task('images:optimize', function() {
	return gulp.src(paths.dist + '**/*.{png,gif,svg,jpg,jpeg}', {base: paths.dist})
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [optipng()]
		}))
		.on('error', function(error) {
			console.error(error);
			this.emit('end');
		})
		.pipe(gulp.dest(paths.dist));
});

gulp.task('images:srcset', function () {
	return gulp.src([paths.images + '**/*.{jpg,png}'])
		.pipe(responsive({
			'avatars/*.{jpg,png}': [
				// JPG, PNG
				{height: '135', width: '135', rename: {suffix: '-l'}, crop: 'center'},
				{height: '40', width: '40', rename: {suffix: '-s'}, crop: 'center'},
				//	WEBP
				{height: '135', width: '135', rename: {suffix: '-l', extname: '.webp'}, crop: 'center'},
				{height: '40', width: '40', rename: {suffix: '-s', extname: '.webp'}, crop: 'center'}
			],
			'highlight/*.{jpg,png}': [
				// JPG, PNG
				{width: '690', rename: {suffix: '-l'}, crop: 'center'},
				{width: '430', rename: {suffix: '-s'}, crop: 'center'},
				// WEBP
				{width: '690', rename: {suffix: '-l', extname: '.webp'}, crop: 'center'},
				{width: '430', rename: {suffix: '-s', extname: '.webp'}, crop: 'center'}
			],
			'header/*.{jpg,png}': [{
				width: '100%', rename: {suffix: ''}}
			],
			'content/*.{jpg,png}': [
				// JPG, PNG
				{width: '990px', rename: {suffix: '-l'}},
				{width: '680px', rename: {suffix: '-m'}},
				{width: '480px', rename: {suffix: '-s'}},
				// WEBP
				{width: '990px', rename: {suffix: '-l',	extname: '.webp'}},
				{width: '680px', rename: {suffix: '-m',	extname: '.webp'}},
				{width: '480px', rename: {suffix: '-s',	extname: '.webp'}}
			],
			'full-width/*.{jpg,png}': [
				// JPG, PNG
				{width: '1500px', rename: {suffix: '-xl'}},
				{width: '1024px', rename: {suffix: '-l'}},
				{width: '800px', rename: {suffix: '-m'}},
				{width: '600px', rename: {suffix: '-s'}},
				{width: '400px', rename: {suffix: '-xs'}}
			],
			'svg/*.*': [
				{width: '100%'}
			],
			'social/*.*': [
				{width: '100%'}
			],
			'tile/*.{jpg,png}': [
				// JPG, PNG
				{width: '300px', height: '300px', crop: 'center'},
				{width: '600px', height: '300px', rename: {suffix: '-wide'}, crop: 'center'},
				// WEBP
				{width: '300px', height: '300px', rename: {extname: '.webp'}, crop: 'center' },
				{width: '600px', height: '300px', rename: {suffix: '-wide', extname: '.webp'}, crop: 'center'}
			]},
			{
				// Global configuration for all images
				// The output quality for JPEG, WebP and TIFF output formats
				quality: 80,
				// Use progressive (interlace) scan for JPEG and PNG output
				progressive: true,
				// Strip all metadata
				withMetadata: false,
				withoutEnlargement: true,
				skipOnEnlargement: false,
				errorOnEnlargement: false
			}
		))
		.pipe(rename(function(path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(paths.distImages));
});

gulp.task('images:copy', function() {
	return gulp.src([paths.images + '**/*.{svg,gif}'])
		.pipe(rename(function(path) {
			path.dirname = '';
		}))
		.pipe(gulp.dest(paths.distImages));
});
