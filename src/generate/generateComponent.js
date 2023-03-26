import path from 'node:path'
import { existsSync, mkdirSync, writeFile } from 'node:fs'
import pc from 'picocolors'
import tempCompJS from '../template/componentJS.js'
import tempCompTS from '../template/componentTS.js'
import { lineStyle } from '../consts/index.js'

export function generateComponent({ cliConfigFile, name }) {
	const { cssPreprocessor, baseURL, usesCssModule, usesTypeScript } = cliConfigFile
	const compExtension = usesTypeScript ? '.tsx' : '.jsx'
	let styleExtension = `.module.${cssPreprocessor === 'none' ? 'css' : cssPreprocessor}`
	let folders = name.split(path.sep)

	// Sets the component name to capitalize
	let nameComponent = folders[folders.length - 1]

	let nameComponentStandard = nameComponent.charAt(0).toUpperCase() + nameComponent.slice(1)

	let routes = name.includes('/')
		? [...folders.slice(0, -1), nameComponentStandard]
		: ['components', nameComponentStandard]
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

	// Sets the CSS Module of the component
	if (!usesCssModule) {
		styleExtension = styleExtension.replace('.module', '')
		component = component.replace(lineStyle, `import './${nameComponentStandard}${styleExtension}'`)
	}
	component = component.replaceAll('TemplateName', nameComponentStandard)
	component = component.replace('Template component', nameComponentStandard)

	let filesToWrite = [
		{
			pathFile: path.join(route, `index${compExtension}`),
			content: component
		},
		{
			pathFile: path.join(route, nameComponentStandard + styleExtension),
			content: ''
		}
	]

	// Generate the folders if they don't exist
	route.split(path.sep).reduce((prevPath, folder) => {
		const currentPath = path.join(prevPath, folder)
		if (!existsSync(currentPath)) mkdirSync(currentPath)

		return currentPath
	}, '')

	// Generates the component files
	filesToWrite.forEach(({ pathFile, content }) => {
		writeFile(pathFile, content, (error) => {
			if (error) {
				const err = new Error('An error occurred while generating the hook')

				err.name = 'InternalError'
				throw err
			}
		})
	})

	console.log(pc.green(`${name} created successfully`))
}
