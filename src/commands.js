import { readFileSync, writeFileSync } from 'node:fs'
import process from 'node:process'
import pc from 'picocolors'
import { generateComponent } from './generate/generateComponent.js'
import { generateHook } from './generate/generateHook.js'
import { modifyConfigurationFile } from './modifyConfiguration.js'

/**
 * @param { Object }
 * @property { Args } args
 * @property { Config } cliConfigFile
 * @property { Object } program
 */
export function generateCommands({ args, cliConfigFile, program }) {
	/* Generator */
	// Generate Component
	program
		.command('component')
		.argument('<componentPath>', 'Name of the component')
		.alias('c')
		.option('--fileName <name>', 'Generate a <name>.jsx|tsx file. (default: index)', 'index')
		.option(
			'--withoutStyles',
			'Indicates that you should not generate the stylesheet file for the component'
		)
		.option(
			'--withoutTest',
			'Indicates that you should not generate the test file for the component'
		)
		.action((schematic, options) => {
			try {
				generateComponent({ cliConfigFile, schematic, options })
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

	/* Config file */
	program
		.command('config')
		.description('Shows the root where the files will be generated')
		.option('--changeURL <newBaseURL>', 'Change the baseURL value of the configuration file')
		.option(
			'--changeLang <lang>',
			'Modifies if the files are generated in JS or TS. Values: js, ts'
		)
		.option('--useCSSModules', 'Stylesheets are generated in CSS Modules')
		.option('--no-useCSSModules', 'Stylesheets are not generated in CSS modules')
		.option(
			'--changeCSSPreprocessor <preprocessor>',
			'Change the CSS preprocessor to use. Values: scss, sass, none'
		)
		.option('--useTest', 'Enable test file generation')
		.option('--no-useTest', 'Disable test file generation')
		.name('config')
		.usage('[options]')
		.action((options, cmd) => {
			const configFile = readFileSync('./rcliconfig.json', 'utf-8')
			const config = JSON.parse(configFile)

			if (Object.keys(options).length === 0) cmd.help()

			try {
				let newConfig = modifyConfigurationFile({ config, options })

				writeFileSync('./rcliconfig.json', newConfig, 'utf-8')

				console.log(`\n${pc.green('SUCESS')} Configuration file modified successfully`)
			} catch (err) {
				if (err.name === 'ConfigError') throw err

				const error = new Error('Error modifying configuration file')

				error.name = 'ConfigError'
				throw error
			}
		})

	program.parse(args)
}
