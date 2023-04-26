"use client"
import React, { useState } from 'react'
import TabFilter from './components/tab-filter'
import Select from './components/select'
import { RenderIcon } from './icons'
import { Table } from '@test-assessment/ui-components'
import clsx from 'clsx'
import PieChart from './components/pie-chart'
import Paging from './components/paging'

const options = [{ label: "All (12)", value: "All" }, { label: "Published (9)", value: "Published" }, { label: "Draft (3)", value: "Draft" }]
export default function TestPage() {
  const [tabActive, setTabActive] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowPerPage, setRowPerPage] = useState<number>(10)

  return (
    <div className="bg-neutral-table-header h-full" style={{ background: "#F3F0F5" }}>
      <div className="container mx-auto bg-neutral-white p-6 -translate-y-[128px]">
        {/** HEADER */}
        <div className="flex items-center gap-8 flex-wrap">
          <TabFilter
            options={options}
            onChange={(value) => setTabActive(value)}
            active={tabActive}
          />
          <Select
            label="Job position"
            options={options}
            onChange={(value) => alert(value)}
          />
          <Select
            label="Level"
            options={options}
            onChange={(value) => alert(value)}
          />
          <span className="w-6 h-0 border border-solid border-neutral-disable rotate-90"></span>
          <div className="flex items-center w-fit cursor-pointer" onClick={() => alert("Clear filter")}>
            <p className="mr-2 font-medium text-13 leading-6 text-primary-base">Clear filter</p>
            <RenderIcon name="refresh" className='text-primary-base' />
          </div>
        </div>

        {/** TABLE CONTENT */}
        <Table
          rows={[
            {
              name: 'Full Stack Web Developer',
              published: new Date(),
              sent: 1,
              submitted: 1,
              author: 'hien.nguyen@xpon.ai',
              position: 'Developer',
              level: 'Junior',
            },
            {
              name: 'SM leader',
              published: new Date(),
              sent: 2,
              submitted: 4,
              author: 'tommy.nguyen@xpon.ai',
              position: 'UI/UX',
              level: 'Senior',
            },
            {
              name: 'UI/UX designer',
              published: undefined,
              sent: '_ _',
              submitted: '_ _',
              author: 'tommy.nguyen@xpon.ai',
              position: 'CSM',
              level: 'Leader',
            },
            {
              name: 'CSM',
              published: new Date(),
              sent: 3,
              submitted: 1,
              author: 'hien.nguyen@xpon.ai',
              position: 'CSM',
              level: 'Leader',
            },
          ]}
          columns={[
            {
              title: 'Test name',
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6">{row.name}</span>,
            },
            {
              title: 'Test status',
              render: (row) => <span className={clsx("border border-solid font-medium text-12 leading-4 py-1 px-2", {
                "bg-success-bg border-success-base text-success-border": row.published,
                "border-neutral-border text-neutral-placeholder bg-neutral-table-header": !row.published,
              })}>{row.published ? 'Published' : 'Draft'}</span>,
            },
            {
              title: 'Sent',
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6">{row.sent}</span>,
            },
            {
              title: 'Submitted',
              render: (row) => <div className="flex items-start">
                <PieChart percent={isNaN(Number(row.submitted)) ? 0 : Number(row.submitted) * 25} />
                <span className="ml-2">{row.submitted}</span>
              </div>,
            },
            {
              title: 'Author',
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6">{row.author}</span>,
            },
            {
              title: 'Job position',
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6">{row.position}</span>,
            },
            {
              title: 'Level',
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6">{row.level}</span>,
            },
            {
              title: 'Action',
              render: () => <div className="flex items-center gap-3">
                <span className="cursor-pointer" onClick={() => alert("Edit")}><RenderIcon name="edit" className="text-[#1B1D29] gap-3" /></span>
                <span className="cursor-pointer" onClick={() => alert("Delete")}><RenderIcon name="delete" className="text-[#1B1D29] gap-3" /></span>
              </div>,
            },
          ]}
          className="w-full mt-6"
        />

        <div className="mt-6 flex justify-between">
          <span className="text-13 leading-6 text-neutral-text-primary">Total test: 12</span>
          <div>
            <Paging 
              currentPage={currentPage}
              totalItem={100}
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={(row) => {
                setRowPerPage(row)
                setCurrentPage(1)
              }}
              rowsPerPage={rowPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
