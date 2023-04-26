import { render } from '@testing-library/react';

import { AuthProvider } from './ui-auth-protect';

describe('UiAuthProtect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthProvider />);
    expect(baseElement).toBeTruthy();
  });
});
