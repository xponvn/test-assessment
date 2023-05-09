import React from 'react';
import { render } from '@testing-library/react';

import { Pagination } from './index';

const data = {
  rowsPerPage: [5, 10, 15, 20],
  currentPage: 2,

  totalPage: 10,
  activeTab: 'all',
};
describe('Pagination', () => {
  it(`should render Pagination successfully`, () => {
    const { baseElement } = render(
      <Pagination
        rowsPerPage={data.rowsPerPage}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
        currentRowsPerPage={10}
        onChangePage={() => {
          console.log('changed tab');
        }}
        onChangeRows={() => {
          console.log('changed tab');
        }}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
