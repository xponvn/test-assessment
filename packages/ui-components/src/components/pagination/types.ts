export type PaginationProps = {
  rowsPerPage?: number[];
  currentRowsPerPage?: number;
  currentPage?: number;
  totalPage?: number;
  onChangeRows: (value: number) => void;
  onChangePage: (value: number) => void;
};
