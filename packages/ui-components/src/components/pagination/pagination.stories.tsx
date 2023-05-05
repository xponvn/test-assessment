import type { Meta } from '@storybook/react';
import { Pagination as PaginationComponent } from './index';

const Story: Meta<typeof PaginationComponent> = {
  title: 'Components / Pagination',
  component: PaginationComponent,
};
export default Story;
const data = {
  rowsPerPage: [5, 10, 15, 20],
  currentPage: 2,
  totalPage: 10,
  activeTab: 'all',
};

export const SegmentDefault = () => (
  <PaginationComponent
    rowsPerPage={data.rowsPerPage}
    currentPage={data.currentPage}
    totalPage={data.totalPage}
    onChangePage={() => {
      console.log('changed page');
    }}
    onChangeRows={() => {
      console.log('changed row');
    }}
  />
);

export const SegmentFirstPage = () => (
  <PaginationComponent
    rowsPerPage={data.rowsPerPage}
    currentPage={1}
    totalPage={data.totalPage}
    onChangePage={() => {
      console.log('changed page');
    }}
    onChangeRows={() => {
      console.log('changed row');
    }}
  />
);

export const SegmentLastPage = () => (
  <PaginationComponent
    rowsPerPage={data.rowsPerPage}
    currentPage={10}
    totalPage={data.totalPage}
    currentRowsPerPage={15}
    onChangePage={() => {
      console.log('changed page');
    }}
    onChangeRows={() => {
      console.log('changed row');
    }}
  />
);
