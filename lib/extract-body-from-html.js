'use strict';

const cheerio = require('cheerio');

module.exports = extractBodyFromHtml;

/**
 * Extract body (all but the h1) from HTML.
 *
 * @param {String} html
 * @returns {String} body
 */
function extractBodyFromHtml(html) {
	const $ = cheerio.load(html);
	const $title = $('h1').first();
	$title.remove();

	return $.html();
}
