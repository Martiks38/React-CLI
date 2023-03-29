import { createRequire } from 'node:module'
import { Command } from 'commander'
import { generateCommands } from './commands.js'
import { getCLIConfigFile } from './generateConfig.js'

/**
 * @description Executes the function that generates/gets the configuration file and the function that generates the commands.
 * @param { Args }
 */
export async function cli(args) {
	const cliConfigFile = await getCLIConfigFile()
	const localRequire = createRequire(import.meta.url)
	const pkg = localRequire('../package.json')

	const program = new Command()

	program.version(pkg.version).name('rg')
	program.description('A command line tool for creating components and hooks in React.js')

	generateCommands({ args, cliConfigFile, program })
}
