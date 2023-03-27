import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import pc from 'picocolors'
import { generateComponent } from './generate/generateComponent.js'
import { generateHook } from './generate/generateHook.js'

export function generateCommands({ args, cliConfigFile, program }) {
	// Generate Component
	program
		.command('component')
		.argument('<name>', 'Name of the component')
		.alias('c')
		.action((name) => {
			try {
				generateComponent({ cliConfigFile, name })
				process.exit(0)
			} catch (error) {
				console.error(`[${error.name}]: ${error.message}`)
				process.exitCode = 1
			}
		})

	// Generate Hook
	program
		.command('hook')
		.argument('<name>', 'Name of the hook')
		.alias('h')
		.action((name) => {
			try {
				generateHook({ cliConfigFile, name })
				process.exit(0)
			} catch (error) {
				console.error(`[${error.name}]: ${error.message}`)
				process.exitCode = 1
			}
		})

	program
		.command('root')
		.description('Shows the root where the files will be generated')
		.option('--change <changeValue>', 'Change the baseURL value of the configuration file')
		.action((options) => {
			const configFile = readFileSync('./rcliconfig.json', 'utf-8')
			const config = JSON.parse(configFile)

			if (options.change === undefined) {
				console.log(`\n${pc.blue('Root')}: ${config.baseURL}`)
				return
			}

			let newConfig = JSON.stringify({ ...config, baseURL: options.change }, null, 2)

			try {
				writeFileSync('./rcliconfig.json', newConfig)

				console.log(`\n${pc.green('SUCESS')} Configuration file modified successfully`)
			} catch (err) {
				const error = new Error('Error modifying configuration file')

				error.name = 'ConfigError'
				throw error
			}
		})

	program.parse(args)
}
