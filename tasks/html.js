var minifyHtml = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var config = require('../config');
var paths = config.paths;
var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var through = require('through2');
var nunjucksRender = require('gulp-nunjucks-render');
var nunjucks = require('nunjucks');
var formatDate = require('../lib/format-date');
var marked = require('marked');
var sequence = require('../lib/sequence');
var del = require('del');
var plumber = require('gulp-plumber');
var fs = require('fs');
var markdownToHtml = require('../lib/markdown-to-html');
var urlPattern = require('url-pattern');
var listHeadings = require('../lib/list-headings');
var extractTitleFromHtml = require('../lib/extract-title-from-html');
var extractBodyFromHtml = require('../lib/extract-body-from-html');

gulp.task('html', function(cb) {
	sequence(['html:clean', 'html:build', 'html:index'], cb);
});

/**
 * Watches all html and markdown files
 */
gulp.task('html:watch', function() {
	gulp.watch([
		paths.components + '/**/*.html',
		paths.components + '/**/*.svg',
		paths.content + '**/*.*'
	], ['critical:inline']);
});

/**
 * Delete any html currently in the html destination file destination path
 */
gulp.task('html:clean', function(cb) {
	return del([paths.dist + '**/*.html'], {dot: true})
});

/**
 * Builds HTML pages from Markdown files. Pipes it through a Nunjucks parser.
 * Creates folder structure and an index.html for the site structure
 *
 * @return {Stream}
 */
gulp.task('html:build', function() {
	return gulp.src([paths.content + '**/*.json'])
		.pipe(through.obj(function(file, encoding, callback) {
			if (file.isNull()) {
				return callback(null, file);
			}

			if (file.isStream()) {
				return callback(new gutil.PluginError('html,js', 'Streams not supported!'));
			}

			var view,
				basename = file.relative.replace(/\.(.+)$/, ''), // removes everything from file's path after the first
				markdownFilePath = paths.content + basename + '.md',
				htmlFilePath = paths.content + basename + '.html',
				renderedHtml;

			try {
				var templateVariables = JSON.parse(file.contents.toString());
			} catch (err) {
				console.log('Error in ' + file.relative, err);
			}

			// check if we have markdown content and add it to template variables
			if (fs.existsSync(markdownFilePath)) {
				var markdownContent = fs.readFileSync(markdownFilePath).toString();

				renderedHtml = markdownToHtml(markdownContent);

				templateVariables.title = extractTitleFromHtml(renderedHtml);
				templateVariables.body = extractBodyFromHtml(renderedHtml);
				templateVariables.toc = listHeadings(templateVariables.body, { maxLevel: 2 });
			}

			// check if we have additional html and add it to template variables
			if (fs.existsSync(htmlFilePath)) {
				templateVariables.rawHtml = fs.readFileSync(htmlFilePath).toString();
			}

			var pathPattern = new urlPattern(':language(/:layout)/:slug.json');
			var pathParams = pathPattern.match(file.relative) || {};

			// create nunjucks manageEnvironment
			var manageEnvironment = function(environment) {
				environment.addGlobal('GLOBAL', {
					imagesPath: paths.templateImagesPath,
					language: pathParams.language || 'en',
					url: templateVariables.canonical || '/' + file.relative.replace('.json', '/').replace('index/', ''),
					env: process.env.NODE_ENV,
					version: config.version
				});
				environment.addFilter('date', formatDate);
			};

			// determine the template to be used
			view = getView(pathParams) || templateVariables.layout;

			gulp.src(paths.views + view + '/' + view + '.html')
				.pipe(plumber())
				.pipe(nunjucksRender({
					path: paths.src,
					envOptions: {
						watch: false,
						autoescape: false
					},
					data: templateVariables,
					manageEnv: manageEnvironment
				}))
				.pipe(rename(function(path) {
					path.dirname = basename.replace(/index/, '');
					path.basename = 'index';
				}))
				.pipe(gulpif(process.env.NODE_ENV === 'production', minifyHtml({
						collapseWhitespace: true,
						minifyJS: true,
						minifyCSS: true
					}
				)))
				.pipe(gulp.dest(paths.dist));

			return callback(null, file);
		}));
});

/**
 * Copies the dist/nl/index.html to the root
 * as default page for https://voorhoede.nl
 *
 */
gulp.task('html:index', function(cb) {
	return gulp.src([paths.dist + 'nl/index.html'])
		.pipe(gulp.dest(paths.dist));
});

/**
 * Maps path params to view name
 *
 * @param {object} pathParams
 *
 * @returns {string} the view name
 */
function getView(pathParams) {
	var view;
	var LAYOUTS = {
		'404': 'error',
		'team': 'team',
		'blog-index': 'blog',
		'blog': 'blog-post',
		'contact': 'contact',
		'index': 'home',
		'portfolio': 'project',
		'portfolio-index': 'portfolio'
	};

	if (pathParams.slug === 'index' && !pathParams.layout) {
		view = LAYOUTS['index'];
	} else if (pathParams.slug === 'index') {
		view = LAYOUTS[pathParams.layout + '-index'];
	} else if (LAYOUTS.hasOwnProperty(pathParams.layout)) {
		view = LAYOUTS[pathParams.layout];
	} else if (LAYOUTS.hasOwnProperty(pathParams.slug)) {
		view = LAYOUTS[pathParams.slug];
	}
	return view;
}
