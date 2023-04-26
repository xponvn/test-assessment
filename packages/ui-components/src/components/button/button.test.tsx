import { render } from '@testing-library/react';

import { Button } from './button';
import { mockButtonProps } from './mock';

describe('Button', () => {
  Object.entries(mockButtonProps).forEach(([type, props]) => {
    it(`should render ${type} successfully`, () => {
      const { baseElement } = render(<Button {...props} />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
