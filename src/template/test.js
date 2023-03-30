const tempTestingLibrary = `import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Component from './Component';

describe("<Component />", () => {  
  it('It should display the message "Component created successfully!!".', () => {
    render(<Component />);

    expect(screen.getByText('Component created successfully!!')).toBeDefined()
  });
});`

const tempEnzyme = `import React from "react";
import { shallow } from 'enzyme';
import Component from './index';

describe("<Component />", () => {
  it('It should display the message "Component created successfully!!".', () => {
    const component = shallow(<Component />);

    expect(component.text()).toMatch('Component created successfully!!');
  });
});`

const TEST_TEMPLATE = {
	'Testing Library': tempTestingLibrary,
	Enzyme: tempEnzyme
}

export function templateTest({ library, name }) {
	return TEST_TEMPLATE[library].replaceAll('Component', name)
}
