import { createRequire } from 'node:module'
import { Command } from 'commander'
import { generateCommands } from './commands.js'
import { getCLIConfigFile } from './generateConfig.js'

export async function cli(args) {
	const cliConfigFile = await getCLIConfigFile()
	const localRequire = createRequire(import.meta.url)
	const pkg = localRequire('../package.json')

	const program = new Command()

	program.version(pkg.version)
	program.description('A command line tool for React')

	generateCommands({ args, cliConfigFile, program })
}
