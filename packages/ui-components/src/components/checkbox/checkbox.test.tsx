import React from 'react';
import { render } from '@testing-library/react';

import { CheckBox } from '.';
import { mockCheckBoxProps } from './mock';

describe('Checkbox', () => {
  it(`should render successfully`, () => {
    const checkBox = render(<CheckBox {...mockCheckBoxProps} />);
    expect(checkBox).toMatchSnapshot();
  });
});
