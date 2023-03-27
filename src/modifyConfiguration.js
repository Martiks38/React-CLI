export function modifyConfigurationFile({ config, options }) {
	const { changeLang, changeURL, changeCSSPreprocessor, useCSSModules } = options
	let newConfig = { ...config }

	if (changeURL) {
		newConfig.baseURL = changeURL
	}

	if (changeLang) {
		let extensionsRegex = /^(js|ts)$/i

		if (!extensionsRegex.test(changeLang)) {
			const error = new Error(
				`The extension value ${changeLang} is invalid. Allowed values are: js or ts.`
			)

			error.name = 'ConfigError'
			throw error
		}

		newConfig.usesTypeScript = changeLang === 'ts'
	}

	if (useCSSModules !== undefined) {
		newConfig.usesCSSModule = useCSSModules
	}

	if (changeCSSPreprocessor) {
		let preprocessorRegex = /^(sass|scss|none)$/

		if (!preprocessorRegex.test(changeCSSPreprocessor)) {
			const error = new Error('Valid values for CSS preprocessor are: sass, scss, or none.')

			error.name = 'ConfigError'
			throw error
		}

		newConfig.cssPreprocessor = changeCSSPreprocessor
	}

	return JSON.stringify(newConfig, null, 2)
}
