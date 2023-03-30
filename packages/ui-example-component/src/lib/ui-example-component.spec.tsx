import { render } from '@testing-library/react';

import UiExampleComponent from './ui-example-component';

describe('UiExampleComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiExampleComponent />);
    expect(baseElement).toBeTruthy();
  });
});
