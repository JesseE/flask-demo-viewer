var moment = require('moment');

module.exports = formatDate;

/**
 * Format date as string
 * @param {String} input	datetime string (eg. `2016-01-31`)
 * @param {String} format	to render input in (eg. `DD MMM` or `LL`). See MomentJS docs for options: http://momentjs.com/docs/#/displaying/format/
 * @param {String} [locale]	defaults to `en`.
 * @returns {String}
 */
function formatDate(input, format, locale) {
	if (!input || !format) {
		return '';
	}
	if (locale) {
		moment.locale(locale);
	}
	return moment(new Date(input)).format(format);
}
