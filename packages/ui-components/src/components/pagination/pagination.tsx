import React from 'react';
import clsx from 'clsx';
import { Icon } from '../icons';
import { SelectBox, SelectBoxOption } from '../select-box';
import { PaginationProps } from './types';
import { Input } from '../input/input';

export const Pagination = ({
  rowsPerPage = [5, 10, 15, 20],
  currentPage = 1,
  currentRowsPerPage = 5,
  totalPage = 1,
  onChangeRows,
  onChangePage,
}: PaginationProps) => {
  const [page, setPage] = React.useState(currentPage);
  const [prevStyle, setPrevStyle] = React.useState('');
  const [nextStyle, setNextStyle] = React.useState('');

  const prevPage = () => {
    const prevPage = page > 1 ? page - 1 : 1;
    const isFirstPage = prevPage === page;
    if (!isFirstPage) {
      setPage(prevPage);
      onChangePage(prevPage);
      // animation on button click
      setPrevStyle(`bg-neutral-bg shadow-[0_0_1px_1px_#ddd]`);
      setTimeout(() => {
        setPrevStyle(`bg-transparent `);
      }, 200);
    }
  };
  const nextPage = () => {
    const nextPage = page < totalPage ? page + 1 : totalPage;
    const isLastPage = nextPage === page;
    if (!isLastPage) {
      setPage(nextPage);
      onChangePage(nextPage);
      // animation on button click
      setNextStyle(`bg-neutral-bg shadow-[0_0_1px_1px_#ddd]`);
      setTimeout(() => {
        setNextStyle(`bg-transparent`);
      }, 200);
    }
  };
  const handleOnchangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = Number(event?.target?.value);

    setPage(pageNumber > totalPage ? totalPage : pageNumber);
    onChangePage && onChangePage(pageNumber);
  };

  React.useEffect(() => {
    console.log({ page });
  }, [page]);

  return (
    <div className="flex items-center ">
      <div className={clsx(`flex items-center p-1`)}>
        <SelectBox
          options={
            rowsPerPage.map((rows) => ({
              value: `${rows}`,
              name: `${rows}`,
            })) as unknown as SelectBoxOption[]
          }
          rightIcon={
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          }
          onChange={(value) => {
            onChangeRows(Number(value));
          }}
          size="medium"
          variant="vertical-label"
          defaultValue={`${currentRowsPerPage}`}
          className={``}
        />
        <span className="pl-3">rows per page</span>
      </div>
      <span
        className={clsx(
          `w-6 border border-solid border-neutral-disable rotate-90 h-0`
        )}
      ></span>
      <div className={clsx(`flex items-center justify-between`)}>
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
          <Input
            type="number"
            min={1}
            max={totalPage}
            name="currentPage"
            id="currentPage"
            className={clsx(
              `text-center`,
              `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
            )}
            value={page}
            onChange={(event) => handleOnchangePage(event)}
            width={40}
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
};
