import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'
import tempCompJS from '../template/componentJS.js'
import tempCompTS from '../template/componentTS.js'
import { lineStyle } from '../consts/index.js'

/**
 *
 * @param { Object } Props
 * @property { ConfigOptions } cliConfigFile
 * @property { string } schematic
 * @property { Config } options
 */
export function generateComponent({ cliConfigFile, schematic, options }) {
	const { cssPreprocessor, baseURL, usesCssModule, usesTypeScript } = cliConfigFile
	const compExtension = usesTypeScript ? '.tsx' : '.jsx'
	const filesToWrite = []
	let styleExtension = `.module.${cssPreprocessor === 'none' ? 'css' : cssPreprocessor}`
	let folders = schematic.split('/')

	// Sets the component name to capitalize
	let nameComponent = folders[folders.length - 1]

	let nameComponentStandard =
		nameComponent
			.replaceAll(/[\]\[]/gi, '')
			.charAt(0)
			.toUpperCase() + nameComponent.replaceAll(/[\]\[]/gi, '').slice(1)

	let routes = schematic.includes('/')
		? [...folders.slice(0, -1), nameComponent]
		: ['components', nameComponent]
	let route = path.join(baseURL, ...routes)

	// Sets the component template
	let component = usesTypeScript ? tempCompTS : tempCompJS

	if (existsSync(route)) {
		const error = new Error(`The ${nameComponentStandard} component is already created`)

		error.name = 'ComponentExistsError'
		throw error
	}

	// Replaces the name of the props
	if (usesTypeScript) {
		component = component.replaceAll('TemplateProps', `${nameComponentStandard}Props`)
	}

	if (!options?.withoutStyles) {
		// Sets the CSS Module of the component
		if (!usesCssModule) {
			styleExtension = styleExtension.replace('.module', '')
			component = component.replace(
				lineStyle,
				`import './${nameComponentStandard}${styleExtension}'`
			)
		}

		filesToWrite.push({
			pathFile: path.join(route, nameComponentStandard + styleExtension),
			content: ''
		})
	}

	component = component.replaceAll('TemplateName', nameComponentStandard)
	component = component.replace('Template component', nameComponentStandard)

	filesToWrite.push({
		pathFile: path.join(route, `${options?.fileName || 'index'}${compExtension}`),
		content: component
	})

	// Generate the folders if they don't exist
	route.split(path.sep).reduce((prevPath, folder) => {
		const currentPath = path.join(prevPath, folder)
		if (!existsSync(currentPath)) mkdirSync(currentPath)

		return currentPath
	}, '')

	// Generates the component files
	for (let { pathFile, content } of filesToWrite) {
		try {
			writeFileSync(pathFile, content)
		} catch (error) {
			const err = new Error('An error occurred while generating the component')

			err.name = 'InternalError'
			throw err
		}
	}

	console.log(
		pc.green(
			`\n${
				options?.fileName
					? nameComponentStandard.concat('/', options.fileName)
					: nameComponentStandard
			} created successfully`
		)
	)
}
