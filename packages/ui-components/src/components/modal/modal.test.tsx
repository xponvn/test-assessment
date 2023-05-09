import { render } from '@testing-library/react';

import { Modal } from './modal';

describe('Modal', () => {
  it(`should render input successfully`, () => {
    const { baseElement } = render(
      <Modal
        title="Lorem"
        open
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
        onClose={jest.fn()}
      >
        <p>ipsum</p>
      </Modal>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
