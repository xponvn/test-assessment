import React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from './dropdown';
import { mockDropdownProps } from './mock';

describe('Dropdown', () => {
  it(`should render Dropdown successfully`, () => {
    const { baseElement } = render(<Dropdown {...mockDropdownProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
