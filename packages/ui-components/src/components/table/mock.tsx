import { TableProps } from '.';

export const mockTableProps: TableProps = {
  rows: [
    {
      name: 'name',
      published: new Date(),
      sent: 1,
      submitted: 1,
      author: 'author',
      position: 'Developer',
      level: 'level',
    },
  ],
  columns: [
    {
      title: 'Test name',
      render: 'name',
    },
    {
      title: 'Test status',
      render: (row) => <span>{row.published ? 'Published' : 'Draft'}</span>,
    },
    {
      title: 'Sent',
      render: 'sent',
    },
    {
      title: 'Submitted',
      render: 'submitted',
    },
    {
      title: 'Author',
      render: 'author',
    },
    {
      title: 'Job position',
      render: 'position',
    },
    {
      title: 'Level',
      render: 'level',
    },
    {
      title: 'Action',
      render: () => <>Button</>,
    },
  ],
};
