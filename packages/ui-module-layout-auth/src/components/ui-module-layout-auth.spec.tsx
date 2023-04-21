import { render } from '@testing-library/react';

import UiModuleLayoutAuth from './ui-module-layout-auth';

describe('UiModuleLayoutAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiModuleLayoutAuth />);
    expect(baseElement).toBeTruthy();
  });
});
