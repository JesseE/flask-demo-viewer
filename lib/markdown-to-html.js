var marked = require('marked');
var renderCodeBlock = require('../lib/render-code-block');
var renderImage = require('../lib/render-image');

module.exports = markdownToHtml;

/**
 * Takes markdown, parses it ans returns HTML
 *
 * @param {string} markdown
 *
 * @returns {string} Parsed markdown as HTML string
 *
 */
function markdownToHtml(markdown) {
	var renderer = new marked.Renderer();
	renderer.image = renderImage;
	renderer.code = renderCodeBlock;

	return marked(markdown, { renderer: renderer });
}
