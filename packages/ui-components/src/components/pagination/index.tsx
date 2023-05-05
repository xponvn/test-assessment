import React from 'react';
import clsx from 'clsx';
import { Icon } from '../icons';

export type PaginationProps = {
  rowsPerPage?: number[];
  currentRowsPerPage?: number;
  currentPage?: number | string;
  totalPage?: number;
  onChangeRows: (value: string) => void;
  onChangePage: (value: string) => void;
};

export const Pagination = React.forwardRef(
  (
    {
      rowsPerPage = [5, 10, 15, 20],
      currentPage = 1,
      currentRowsPerPage = 5,
      totalPage = 1,
      onChangeRows,
      onChangePage,
    }: PaginationProps,
    ref
  ) => {
    const [page, setPage] = React.useState(currentPage);
    const [prevStyle, setPrevStyle] = React.useState('');
    const [nextStyle, setNextStyle] = React.useState('');

    const prevPage = () => {
      const prev = Number(page) > 1 ? Number(page) - 1 : 1;
      if (prev !== page) {
        setPage(prev);
        onChangePage(`${prev}`);
        setPrevStyle(`bg-neutral-bg shadow-[0_0_1px_1px_#ddd]`);
        setTimeout(() => {
          setPrevStyle(`bg-transparent `);
        }, 200);
      }
    };
    const nextPage = () => {
      const next = Number(page) < totalPage ? Number(page) + 1 : totalPage;
      if (next !== page) {
        setPage(next);
        onChangePage(`${next}`);
        setNextStyle(`bg-neutral-bg shadow-[0_0_1px_1px_#ddd]`);
        setTimeout(() => {
          setNextStyle(`bg-transparent`);
        }, 200);
      }
    };
    const handleOnchangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const pageNumber = Number(event?.target?.value);
      setPage(
        Number.isNaN(pageNumber) || pageNumber === 0
          ? ''
          : parseInt(`${pageNumber > totalPage ? totalPage : pageNumber}`, 10)
      );
      onChangePage && pageNumber && onChangePage(`${pageNumber}`);
    };

    const customChevronDropdownStyle = {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
    } as React.CSSProperties;

    return (
      <div className="flex items-center ">
        <div className="flex items-center p-1">
          <select
            name="rowperpage"
            id="rowperpage"
            className={clsx(
              `p-2 min-w-[60px] max-h-10`,
              `bg-transparent`,
              `border border-neutral-border`,
              `appearance-none`,
              `bg-no-repeat`,
              `focus:outline-neutral-border`,
              `focus-visible:border-neutral-border`,
              `bg-right`
            )}
            style={customChevronDropdownStyle}
            onChange={(event) => onChangeRows(event.target.value)}
            value={currentRowsPerPage}
          >
            {rowsPerPage.map((rows, i) => (
              <option value={rows} key={i}>
                {rows}
              </option>
            ))}
          </select>
          <span className="pl-3">rows per page</span>
        </div>
        <span className="w-6 border border-solid border-neutral-disable rotate-90 h-0"></span>
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              page === 1
                ? 'text-neutral-disable'
                : 'cursor-pointer hover:bg-neutral-bg',
              `transition ease-in  `,
              `rounded-full`,
              prevStyle
            )}
            aria-disabled={page === 1}
            onClick={() => prevPage()}
          >
            <Icon name="arrow-left" />
          </div>
          <div className="flex items-center px-5 ">
            <input
              type="text"
              name="currentpage"
              id="current-page"
              className={clsx(
                `p-2 w-10 max-h-10 text-center`,
                `border border-neutral-border`,
                `focus:outline-neutral-border focus-visible:border-neutral-border`
              )}
              value={page}
              onChange={(event) => handleOnchangePage(event)}
            />
            <span className="px-3">/</span>
            <span>{totalPage} page(s)</span>
          </div>
          <div
            className={clsx(
              page === totalPage
                ? 'text-neutral-disable '
                : 'cursor-pointer  hover:bg-neutral-bg',
              `transition ease-in `,
              `rounded-full `,
              nextStyle
            )}
            aria-disabled={page === 1}
            onClick={() => nextPage()}
          >
            <Icon name="arrow-right" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    );
  }
);
