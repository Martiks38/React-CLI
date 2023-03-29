import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'
import tempHook from '../template/hook.js'

/**
 * @description Check if the hook already exists and if it meets the naming convention.
 * @param { Object } dataHook - Information of the hook.
 * @param { string } dataHook.name - The name of the hook.
 * @param { string } dataHook.pathHook - The path of the hook.
 *
 * @throws Throws an error if the file already exists or does not comply with the hook naming convention.
 * @throws { HookExistsError } -The hook must not exist.
 * @throws { HookNameError } - The hook must comply with the convention.
 * */
function checkHook({ name, pathHook }) {
	if (existsSync(pathHook)) {
		const error = new Error(`The ${name} hook is already created`)

		error.name = 'HookExistsError'
		throw error
	}

	if (!name.startsWith('use')) {
		const error = new Error('Hooks begin with the word "use"')

		error.name = 'HookNameError'
		throw error
	}

	let firstLetter = name.split('use')[1].charAt(0)
	let isNotPascalCase = /[a-z]/.test(firstLetter)

	if (isNotPascalCase) {
		const error = new Error('Hooks begin with "use" followed by an uppercase letter.')

		error.name = 'HookNameError'
		throw error
	}
}

/**
 *
 * @param { Object }
 * @param { Object }
 * @param { string }
 * @throws Throws an error if it fails to create hook file.
 * @throws { InternalError }
 */
export function generateHook({ cliConfigFile, name }) {
	const { baseURL, usesTypeScript } = cliConfigFile

	const fileExtension = usesTypeScript ? '.ts' : '.js'
	const nameFile = name.concat(fileExtension)

	const route = path.join(baseURL, 'hooks')
	const pathHook = path.join(baseURL, 'hooks', nameFile)

	checkHook({ name, pathHook })

	const fileContent = tempHook.replace('useHook', name)

	// Generate the folders if they don't exist
	route.split(path.sep).reduce((prevPath, folder) => {
		const currentPath = path.join(prevPath, folder)
		if (!existsSync(currentPath)) mkdirSync(currentPath)

		return currentPath
	}, '')

	try {
		writeFileSync(pathHook, fileContent)

		console.log(pc.green(`\n${name} created successfully`))
	} catch (error) {
		const err = new Error('An error occurred while generating the hook')

		err.name = 'InternalError'
		throw err
	}
}
