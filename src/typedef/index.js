/**
 * @typedef { Object } Config Configuration file fields.
 * @property { string } baseUrl
 * @property { boolean } usesTypeScript
 * @property { boolean } usesCssModule
 * @property { ("none"|"sass"|"scss") } cssPreprocessor
 */

/**
 * @typedef { Object } ConfigOptions Options passed in passes in the config command.
 * @property { string } changeURL
 * @property { string } changeLang
 * @property { ("none"|"sass"|"scss") } changeCSSPreprocessor
 * @property { boolean } useCSSModules
 */

/**
 * @typedef { string[] } Args Array containing the arguments passed to the process when run it in the command line (process.argv).
 */
