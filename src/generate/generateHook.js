import { existsSync, mkdirSync, writeFile } from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'
import tempHook from '../template/hook.js'

export function generateHook({ cliConfigFile, name }) {
	const { baseURL, usesTypeScript } = cliConfigFile
	const fileExtension = usesTypeScript ? '.ts' : '.js'
	const template = tempHook.replace('useHook', name)

	const route = path.join(baseURL, 'hooks')

	if (existsSync(path.join(route, name + fileExtension))) {
		const error = new Error(`The ${name} hook is already created`)

		error.name = 'HookExistsError'
		throw error
	}

	if (!name.startsWith('use')) {
		const error = new Error('\nHooks begin with the word "use"')

		error.name = 'HookNameError'
		throw error
	}

	route.split(path.sep).reduce((prevPath, folder) => {
		const currentPath = path.join(prevPath, folder)
		if (!existsSync(currentPath)) mkdirSync(currentPath)

		return currentPath
	}, '')

	writeFile(path.join(route, name + fileExtension), template, (error) => {
		if (error) {
			const err = new Error('An error occurred while generating the hook')

			err.name = 'InternalError'
			throw err
		}
	})

	console.log(pc.green(`${name} created successfully`))
}
