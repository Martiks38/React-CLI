import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import inquirer from 'inquirer'
import pc from 'picocolors'

/**
 * Ask the questions to generate the configuration file.
 * @returns { Promise<Config> }
 * @throws { AnswerError }
 */
async function questions() {
	console.log('')

	return inquirer
		.prompt([
			{
				type: 'input',
				message: `What ${pc.blue('baseURL')} would you like configured?`,
				name: 'baseURL',
				default: 'src'
			},
			{
				type: 'confirm',
				message: `Use ${pc.blue('TypeScript')} in this project?`,
				default: 'Yes',
				name: 'usesTypeScript'
			},
			{
				type: 'confirm',
				message: `Would you like to use ${pc.blue('CSS Modules')} with this project?`,
				name: 'usesCssModule',
				default: 'No'
			},
			{
				type: 'list',
				message: `Use ${pc.blue('CSS preprocessor')} in this project?`,
				choices: ['none', 'scss', 'sass'],
				default: 'none',
				name: 'cssPreprocessor'
			}
		])
		.then((answers) => answers)
		.catch(() => {
			const error = new Error('It was produce a error to create the config file.')

			error.name = 'AnswerError'
			throw error
		})
}

/**
 * @description Find the configuration file. If it finds it, it reads it and returns the information. Otherwise, it calls questions(), generates that file, and returns the answer.
 * @returns { Config }
 * @throws If an error occurs, the execution will be terminated.
 */
export async function getCLIConfigFile() {
	try {
		if (existsSync('./rcliconfig.json')) {
			const contentConfigFile = readFileSync('./rcliconfig.json', 'utf-8')
			const config = JSON.parse(contentConfigFile)
			return config
		}

		const answers = await questions()
		const content = JSON.stringify(answers, null, 2)

		try {
			writeFileSync('./rcliconfig.json', content, 'utf-8')
		} catch (err) {
			if (err) {
				const error = new Error('It was produce a error to create the config file.')

				error.name = 'InternalError'
				throw error
			}
		}

		return answers
	} catch (error) {
		console.error(`[${error.name}]: ${error.message}`)
		process.exit(1)
	}
}
