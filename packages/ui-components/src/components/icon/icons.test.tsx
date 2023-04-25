import { render } from '@testing-library/react';

import { RenderIcon } from './index';
import { mockIcons } from './mock';

describe('Button', () => {
  Object.entries(mockIcons).forEach(([type, props]) => {
    it(`should render ${type} successfully`, () => {
      const { baseElement } = render(<RenderIcon {...props} />);
      expect(baseElement).toMatchSnapshot();
    });
  });
});
