import { lineStyle } from '../consts/index.js'

export default `import PropTypes from 'prop-types';
${lineStyle}

function TemplateName( {} ) {
  return <p>Template component created successfully!!</p>
}

TemplateName.propTypes = {};

export default TemplateName`
