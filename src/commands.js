import process from 'node:process'
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

	program.parse(args)
}
