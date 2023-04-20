/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Table, TableProps } from '.';

export default {
  title: 'Components/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

type DataType = {
  name: string;
  published: Date;
  sent: number;
  submitted: number;
  author: string;
  position: string;
  level: string;
};

const Template: ComponentStory<typeof Table<DataType>> = (
  args: TableProps<DataType>
) => <Table<DataType> {...args} />;

export const Default = Template.bind({});
Default.args = {
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
      render: (row) => <span>{row.published ? "Published" : "Draft"}</span>,
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
