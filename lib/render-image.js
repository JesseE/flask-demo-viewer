var config = require('../config');
var imageSize = require('image-size');
var paths = config.paths;
var nunjucks = require('nunjucks');

module.exports = renderImage;
/**
 *
 * Takes basic image properties(href, title and alt) and
 * returns a responsive html `figure`
 *
 * @param {string} href
 * @param {string} title
 * @param {string} alt
 *
 * @returns {string} A string containing an html figure based on params
 *
 * <figure>
 *   <picture>
 *     <!-- webp images -->
 *     <source type="image/webp" srcset="image-l.webp" media="(min-width: 570px)">
 *     <source type="image/webp" srcset="image-m.webp" media="(min-width: 320px)">
 *     <source type="image/webp" srcset="image-s.webp">
 *     <!-- jpeg images -->
 *     <source srcset="image-l.jpg" media="(min-width: 570px)">
 *     <source srcset="image-m.jpg" media="(min-width: 320px)">
 *     <!--[if IE 9]></video><![endif]-->
 *     <img srcset="image-l.jpg" alt=" the alt text">
 *   </picture>
 *   <figcaption>The title text</figcaption>
 * <figure>
 */
function renderImage(href, title, alt) {
	var name = href.split('.').shift(),
		ext = href.split('.').pop(),
		dimensions = imageSize(paths.images + 'content/' + href),
		ratio = dimensions.height / dimensions.width;

	nunjucks.configure([paths.src], {base: paths.src, watch: false});

	return nunjucks.render('components/content-figure/content-figure.html', {
		name: name,
		ext: ext,
		alt: alt,
		ratio: ratio,
		title: title,
		GLOBAL: {imagesPath: paths.templateImagesPath}
	});
}
