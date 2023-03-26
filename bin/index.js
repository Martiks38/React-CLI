#!/usr/bin/env node
import { cli } from '../src/cli.js'

const isNotValidNodeVersion = () => {
	const currentNodeVersion = process.versions.node
	const major = currentNodeVersion.split('.')[0]

	if (major < 16) {
		console.error(
			`Your are running Node ${major}. React CLI requires Node 16 or higher. Please update your version of Node`
		)
	}

	return major < 16
}

if (isNotValidNodeVersion()) process.exit(1)

cli(process.argv)
