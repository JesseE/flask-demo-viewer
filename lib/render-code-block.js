var prism = require('prismjs');

module.exports = codeBlockRenderer;
/**
 * Takes codeblock and code language, uses prismjs to enable syntax highlighting
 * and returns the prismized html as string
 *
 * @param {string} code
 * @param {string} language
 *
 * @returns {string} A string containing prismized html code block
 */
function codeBlockRenderer(code, language) {
	language = (prism.languages.hasOwnProperty(language)) ? language : 'markup';
	return '<pre class="language-' + language + '"><code>' + prism.highlight(code, prism.languages[language]) + '</code></pre>';
}
