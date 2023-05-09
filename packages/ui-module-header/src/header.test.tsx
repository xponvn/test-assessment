import { render } from '@testing-library/react';

import { Header } from './header';
import { mockHeaderProps } from './mock';

describe('Header', () => {
  it(`should render Header successfully`, () => {
    const { baseElement } = render(<Header {...mockHeaderProps} />);
    expect(baseElement).toMatchSnapshot();
  });
});
