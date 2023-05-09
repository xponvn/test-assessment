import { render } from '@testing-library/react';

import { Input } from './input';

describe('Input', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <Input
        type="text"
        value="this is value"
        width={300}
        readOnly
        onChange={jest.fn()}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
