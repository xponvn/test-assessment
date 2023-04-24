import React from 'react';
import { render } from '@testing-library/react';
import { selectionData } from './mock';

import { Selection } from './selection';

describe('Selection', () => {
  it(`should render Selection successfully`, () => {
    const { baseElement } = render(
        <Selection
        placeholder="Select..."
        data={selectionData}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
