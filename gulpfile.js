'use strict';

const paths = {
    src: './templates/',
    dist: './static/'
};
let handlers = {};

// PLUGINS
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const del = require('del');
const favicons = require('gulp-favicons');
const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
const minifyCss = require('gulp-minify-css');
const nightwatch = require('gulp-nightwatch');
const _path = require('path'); // underscore is to distinguish between local `path` variables in some functions
const plumber = require('gulp-plumber');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const taskListing = require('gulp-task-listing');
const uglify = require('gulp-uglify');
const watchify = require('watchify');
const yargs = require('yargs');
const browserSync = require('browser-sync');
// MAIN TASKS

gulp.task('build', ['build:css', 'build:js']);
gulp.task('default', ['help']);
gulp.task('help', help);
gulp.task('watch', watch);

// SUB TASKS

gulp.task('build:all', ['build:clean', 'build:css', 'build:js', 'favicons:generate', 'fonts:copy']);
gulp.task('build:clean', buildClean);
gulp.task('build:css', buildCss);
gulp.task('build:js', buildJs);
gulp.task('favicons:generate', generateFavicons);
gulp.task('fonts:copy', copyFonts);
gulp.task('icons:optimize', optimizeIcons);

// HANDLER FUNCTIONS
// not sure if this fixes the memomryleak problem but it was suggested here:
// http://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
require('events').EventEmitter.prototype._maxListeners = 100;
/**
 * Basic error handler; puts message to the screen, stops the stream
 * @param {Object} error - Error event
 */
handlers.onStreamError = function(error) {
    console.error(error.message);
    this.emit('end');
};

handlers.onPromiseError = function(error) {
    console.error(error.constructor.name + ': ' + error.message);
};

// TASK FUNCTIONS

/**
 * Cleans the build (meaning: deletes dist folder)
 * Note the 'sync' property, preventing issues with async writing to the dist
 * folder while it is being deleted
 */
function buildClean() {
    del.sync(paths.dist);
}

/**
 * Builds CSS from LESS files and writes to dist folder
 * Note that all LESS files are included manually in `index.less`
 *
 * - Plumber       Makes sure LESS errors don't result in the watcher crashing
 * - Sourcemaps    Writes external source map file in same folder as CSS
 * - Less          Compiles LESS into CSS; on error, outputs error message and
 *                 ends stream without watcher crashing
 * - Autoprefixer  Prefixes some CSS properties for older/incompatible browsers
 * - MinifyCss     Minifies CSS to reduce file size
 *
 * @returns {Stream}
 */
function buildCss() {
    return gulp.src(paths.src + 'index.less')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .on('error', handlers.onStreamError)
        .pipe(autoprefixer({ browsers: ['> 1%', 'last 2 versions'] }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist+'/css'));
}

/**
 * Compile & uglify main index JS and add external source map.
 * @return {Stream}
 */
function buildJs() {
    const bundler = createBundler();
    return writeBundle(bundler);
}

/**
 * Watch JS source files and rebundle on changes
 * @return {[type]} [description]
 */
function watchJs() {
    var bundler = watchify(createBundler());
    bundler.on('update', bundle); // on any dep update, rebundle
    bundler.on('log', gutil.log); // output build logs to terminal
    function bundle() {
        return writeBundle(bundler);
    }
    return bundle();
}

/**
 * Create a pre-configured bundler
 * @return {Object} browserify instance configured for app's index
 */
function createBundler() {
    return browserify({
            entries: paths.src + 'index.js', // main file
            debug: true // sourcemaps
        })
}

/**
 * Bundle JS by compiling TS files, combining and uglifying them, with source maps.
 * @param  {Object} bundler (browserify instance)
 * @return {Stream}
 */
function writeBundle(bundler) {
    return bundler
        .bundle()
        .pipe(source('index.js')) // name of output file
        .pipe(buffer()) // convert to buffer to enable source
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist+'/js'));
}

/**
 * Copy fonts from core/typography/fonts folder to static folder
 * @return {Stream}
 */
function copyFonts() {
	return gulp.src(`${paths.src}components/core/typography/fonts/**/*`)
		.pipe(gulp.dest(`${paths.dist}fonts/`));
}

/**
 * Turn logo into favicons and touch icons with related manifest files
 * @returns {Stream}
 */
function generateFavicons() {
    const folderName = 'favicons/';
    const pkg = require('./package.json');
    const faviconsDir = `${paths.src}components/favicons/`;
    const faviconsConfig = Object.assign({}, require(`${faviconsDir}config.js`), {
        appName: pkg.appName,
        version: pkg.version,
        path: `/static/${folderName}`,
        html: `${faviconsDir}favicons.html`
    });
    return gulp.src(`${faviconsDir}assets/dmc-logo.png`)
        .pipe(favicons(faviconsConfig))
        .pipe(gulp.dest(paths.dist + folderName));
}

/**
 * List gulp tasks. Doesn't list the task 'default' since that's what probably
 * led you to this list
 */
function help() {
    taskListing.withFilters(null, 'default');
}

/**
 * Optimize SVGs for web (so mainly removes unneeded clutter)
 * @return {Stream}
 */
function optimizeIcons() {
    var iconDir = paths.src + 'components/core/icons/assets/';
    return gulp.src(iconDir + '*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(iconDir));
}

/**
 * Starts all the watch tasks.
 */
function watch() {
    gulp.watch(paths.src + '**/*.less', ['build:css']);
    watchJs(); // use watchify instead of gulp.watch for faster rebundling
}

