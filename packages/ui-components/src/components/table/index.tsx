import clsx from 'clsx';
import { useState } from 'react';

type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type TableColumnConfig<T> = {
  title: string | JSX.Element;
  className?: string;
  render: ((row: T) => JSX.Element) | Extract<keyof T, string>;
  sortable: boolean;
  accessor: string;
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

enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
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

  const handleSortingChange = (accessor: string) => {
    console.log(accessor);

    const sortOrder =
      accessor === sortField && order === SORT_ORDER.ASC
        ? SORT_ORDER.DESC
        : SORT_ORDER.ASC;

    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const handleSorting = (sortField: string, sortOrder: string) => {
    console.log(sortField, sortOrder);

    if (sortField) {
      console.log(props);
    }
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
                  ? () => handleSortingChange(column.accessor)
                  : undefined
              }
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index: number) => (
          <RenderRow<T> row={row} columns={props.columns} key={index} />
        ))}
      </tbody>
    </table>
  );
};
