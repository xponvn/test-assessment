'use client';

import { useState } from 'react';
import { COLUMN_TYPE, SORT_ORDER } from '.';

export const useSortableTable = <T,>(data: T[]) => {
  const [tableData, setTableData] = useState(data as T[]);

  const handleSorting = (
    sortField: string,
    sortOrder: string,
    columnType: string | undefined
  ) => {
    const sorted = [...data].sort((a, b) => {
      const orderNumb = sortOrder === SORT_ORDER.ASC ? -1 : 1;

      // sort date
      if (columnType === COLUMN_TYPE.DATE) {
        console.log('SORT INVITE');
        const dateA: Date = new Date(a[sortField as keyof T] as string);
        const dateB: Date = new Date(b[sortField as keyof T] as string);

        return (dateA.getTime() - dateB.getTime()) * orderNumb;
      }

      // sort number
      if (columnType === COLUMN_TYPE.NUMBER) {
        return (
          ((a[sortField as keyof T] as number) -
            (b[sortField as keyof T] as number)) *
          orderNumb
        );
      }

      // sort string
      if (columnType === COLUMN_TYPE.STRING) {
        console.log('SORT STRING');
        const titleA = (a[sortField as keyof T] as string).toLowerCase();
        const titleB = (b[sortField as keyof T] as string).toLowerCase();

        if (titleA > titleB) return 1 * orderNumb;
        if (titleA < titleB) return -1 * orderNumb;
      }

      return 0;
    });

    setTableData(sorted);
  };

  return [tableData, handleSorting] as const;
};
