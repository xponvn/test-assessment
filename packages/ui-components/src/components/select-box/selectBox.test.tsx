import React from 'react';
import { render } from '@testing-library/react';
import { SelectBox } from './selectBox';
import { mockSelectBoxProps } from './mock';

describe('SelectBox', () => {
  it(`should render SelectBox successfully`, () => {
    const { baseElement } = render(<SelectBox {...mockSelectBoxProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
