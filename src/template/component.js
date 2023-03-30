import { lineStyle } from '../consts/index.js'

const templateJS = `import React from "react";
import PropTypes from 'prop-types';
${lineStyle}

function TemplateName( {} ) {
  return <p>Template component created successfully!!</p>
}

TemplateName.propTypes = {};

export default TemplateName`

const templateTS = `import React from "react";
${lineStyle}

interface TemplateProps {}

function TemplateName( {}: TemplateProps ): JSX.Element {
  return <p>Template component created successfully!!</p>
}

export default TemplateName`

const COMPONENT_TEMPLATES = {
	js: templateJS,
	ts: templateTS
}

export function templateComponent({ extension, name }) {
	const regex = /TemplateName|Template component|Template/gi
	let template = COMPONENT_TEMPLATES[extension.slice(1, -1)]

	return template.replaceAll(regex, name)
}
