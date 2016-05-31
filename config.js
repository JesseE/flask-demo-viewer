var fs = require('fs');
var pkg = require('./package');

module.exports = {
	port: 3000,
	demoViewerPort: 3001,
	version: pkg.version,
	paths: {
		src: './templates/',
		components: './templates/components/',
		views: './views/',
		images: './src/assets/media/',
		assets: [
			'./src/assets/**/*.*',
			'!./src/assets/media/**/*.*',
			'!./src/assets/favicons/**/*.*'
		],
		favicons: [
			'./src/assets/favicons/**/*.*'
		],
		scripts: [
			'./templates/components/**/*.js',
			'!./src/components/_*/*.js',
			'!./src/views/_*/*.js',
			'!./src/assets/vendor/**/*.js',
			'!./src/views/styleguide/styleguide.js'
		],
		vendorScripts: [
			'./src/assets/vendor/**/*.js'
		],
		content: './content/',
		dist: './static/dist/',
		distAssets: './static/dist/assets/',
		distImages: './static/dist/assets/images/',
		templateImagesPath: '/assets/images/'
	}
};
