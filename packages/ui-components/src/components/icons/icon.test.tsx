import { render } from '@testing-library/react';

import { Icon } from './index';
import { mockIcons } from './mock';

describe('Button', () => {
  Object.entries(mockIcons).forEach(([type, props]) => {
    it(`should render ${type} successfully`, () => {
      const { baseElement } = render(<Icon {...props} />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
