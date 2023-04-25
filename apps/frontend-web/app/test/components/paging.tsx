import React from 'react'
import clsx from 'clsx';
import { Icon } from '@test-assessment/ui-components';

type PagingProps = {
  rowsPerPage?: number;
  currentPage: number;
  totalItem: number;
  onChangePage: (page: number, type?: "next" | "previous") => void;
  onChangeRowsPerPage?: (row: number) => void;
};

export default function Paging({ rowsPerPage = 10, currentPage, totalItem, onChangePage, onChangeRowsPerPage }: PagingProps) {
  const otpRowPerPage = [10, 20, 30, 40, 50];
  const totalPage = totalItem % rowsPerPage === 0 ? totalItem / rowsPerPage : Math.floor((totalItem / rowsPerPage)) + 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center">
        <select onChange={(e) => onChangeRowsPerPage(Number(e.target.value))} className="outline-none bg-neutral-white border border-solid border-neutral-text-primary text-neutral-text-primary text-15 leading-20 py-[10px] px-2 h-10">
          {otpRowPerPage.map((item, index) => <option key={index} value={item}>{item}</option>)}
        </select>
        <p className="text-neutral-text-primary text-13 leading-24 ml-3">rows per page</p>
      </div>
      <span className="border border-solid border-neutral-disable rotate-90 w-6 h-0"></span>
      <div className="flex items-center gap-3">
        <span onClick={() => {
          if (currentPage === 1) return;
          onChangePage(currentPage - 1, "previous")
        }}>
          <Icon name="arrow-left" className={clsx("cursor-pointer", {
            "text-neutral-disable cursor-no-drop": currentPage === 1,
            "text-neutral-text-secondary": currentPage !== 1
          })} />
        </span>

        <p className="h-10 aspect-square bg-neutral-white border border-solid border-neutral-text-primary text-15 leading-6 text-neutral-text-primary flex items-center justify-center">{currentPage}</p>
        <p className="text-13 leading-6 text-neutral-text-primary">/ {nextPage - 1 === totalPage ? nextPage - 1 : nextPage} page</p>
        <span onClick={() => {
          if (nextPage - 1 === totalPage) return;
          onChangePage(currentPage + 1, "previous")
        }}>
          <Icon name="arrow-right" className={clsx("cursor-pointer", {
            "text-neutral-disable cursor-no-drop": nextPage - 1 === totalPage,
            "text-neutral-text-secondary": nextPage !== totalPage
          })} />
        </span>
      </div>

    </div>
  )
}
