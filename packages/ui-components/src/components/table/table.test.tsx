import React from 'react';
import { render } from '@testing-library/react';

import { Table } from './';
import { mockTableProps } from './mock';

describe('Table', () => {
  it(`should render successfully`, () => {
    const table = render(<Table {...mockTableProps} />);
    expect(table).toMatchSnapshot();
  });
});
