import clsx from 'clsx';
import { useState } from 'react';
import { Icon } from '../icons';
import { useSortableTable } from './useSortableTable';

type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type TableColumnConfig<T> = {
  title: string | JSX.Element;
  className?: string;
  render: ((row: T) => JSX.Element) | Extract<keyof T, string>;
  sortable?: boolean;
  accessor?: string;
  dataType?: string;
};

export type TableProps<T = any> = {
  rows: T[];
  columns: TableColumnConfig<ArrayElement<TableProps<T>['rows']>>[];
  className?: string;
};

type TableRenderRowProps<T> = {
  row: T;
  columns: TableColumnConfig<T>[];
};

type TableRenderCellProps<T> = {
  row: T;
  render: TableColumnConfig<T>['render'];
};

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export enum COLUMN_TYPE {
  STRING = 'string',
  DATE = 'date',
  NUMBER = 'number',
}

const RenderCell = <T,>(props: TableRenderCellProps<T>) => {
  if (typeof props.render === 'string') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{props.row[props.render] as string}</>;
  }
  return props.render(props.row);
};

const RenderRow = <T,>(props: TableRenderRowProps<T>) => {
  return (
    <tr>
      {props.columns.map((column, index: number) => (
        <td key={index} className="text-subhead-2 py-4 px-3">
          <RenderCell<T> row={props.row} render={column.render} />
        </td>
      ))}
    </tr>
  );
};

export const Table = <T,>(props: TableProps<T>) => {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('');
  const [tableData, handleSorting] = useSortableTable(props.rows);

  const handleSortingChange = (
    accessor: string,
    columnType: string | undefined
  ) => {
    const sortOrder =
      order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder, columnType);
  };

  return (
    <table className={clsx('border border-neutral-border', props.className)}>
      <thead>
        <tr>
          {props.columns.map((column, index: number) => (
            <th
              className={`${
                column.sortable && 'cursor-pointer'
              } text-subhead-2 py-2 px-3 text-neutral-placeholder bg-neutral-divider text-left`}
              key={index}
              onClick={
                column.sortable
                  ? () =>
                      handleSortingChange(
                        column.accessor as string,
                        column?.dataType
                      )
                  : undefined
              }
            >
              <span className="flex">
                {column.title}
                {column.sortable && (
                  <Icon
                    name="arrow-up"
                    className={
                      order === SORT_ORDER.ASC && sortField === column.accessor
                        ? 'rotate-180'
                        : 'rotate-0'
                    }
                  />
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index: number) => (
          <RenderRow<T> row={row} columns={props.columns} key={index} />
        ))}
      </tbody>
    </table>
  );
};
