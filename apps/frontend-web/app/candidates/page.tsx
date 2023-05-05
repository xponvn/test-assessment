'use client';

import { Input, SelectBox, Table } from 'packages/ui-components/src/components';
const args = {
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
  
const Page = () => {
  return (
    <div>
      <div className="flex pt-6 pb-8 items-center flex-col md:flex-row justify-between">
        <Input placeholder="Search by test name or author" type="search" />
        <SelectBox
          options={[]}
          onChange={(value) => {
            console.log(value);
          }}
          variant={'horizontal-label'}
          size={'medium'}
        ></SelectBox>
      </div>
      <Table {...args}/>

    </div>
  );
};

export default Page;
