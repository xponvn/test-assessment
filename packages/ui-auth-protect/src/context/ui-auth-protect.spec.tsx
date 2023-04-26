import { render } from '@testing-library/react';

import UiAuthProtect from './ui-auth-protect';

describe('UiAuthProtect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiAuthProtect />);
    expect(baseElement).toBeTruthy();
  });
});
