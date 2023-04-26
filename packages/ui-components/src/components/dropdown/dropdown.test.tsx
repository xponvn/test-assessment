import React from 'react';
import { render } from '@testing-library/react';
import { Dropdown } from './dropdown';

describe('Dropdown', () => {
  Object.entries({}).forEach(([type, props]) => {
    it(`should render ${type} successfully`, () => {
      const { baseElement } = render(
        <Dropdown button={undefined} children={undefined} />
      );
      expect(baseElement).toMatchSnapshot();
    });
  });
});
