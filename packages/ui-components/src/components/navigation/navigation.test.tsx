import React from 'react';
import { render } from '@testing-library/react';
import { Navigation } from './navigation';
import { mockNavigationProps } from './mock';

describe('Navigation', () => {
  it(`should render Navigation successfully`, () => {
    const { baseElement } = render(<Navigation {...mockNavigationProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
