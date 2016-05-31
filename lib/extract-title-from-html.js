'use strict';

const cheerio = require('cheerio');

module.exports = extractTitleFromHtml;

/**
 * Extract title (h1) from HTML.
 *
 * @param {String} html
 * @returns {String} title
 */
function extractTitleFromHtml(html) {
	const $ = cheerio.load(html);
	const $title = $('h1').first();

	return $title.html();
}
