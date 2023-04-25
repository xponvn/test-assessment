"use client"
import React, { useEffect, useState } from 'react'
import TabFilter from './components/tab-filter'
import Select from './components/select'
import { Icon, Table } from '@test-assessment/ui-components'
import clsx from 'clsx'
import PieChart from './components/pie-chart'
import Paging from './components/paging'
import { GetTestsQueryVariables, PublicationState, TestEntity, useApiClient } from '@test-assessment/cms-graphql-api'
import { transformListTest } from './utils/helper'
import { getLevelPosition, transformPositions } from './add/utils'
import { SelectOption } from './add/components/form-base/select'

const options = [{ label: "All (12)", value: PublicationState.Preview }, { label: "Published (9)", value: PublicationState.Live }, { label: "Draft (3)", value: undefined }]
export default function TestPage() {
  const [tabActive, setTabActive] = useState<string>(PublicationState.Preview);
  const [paging, setPaging] = useState<{ page: number, pageSize: number }>({ page: 1, pageSize: 10 });
  const [totalItem, setTotalItem] = useState<number>(0)
  const [otpPositions, setOtpPositions] = useState<SelectOption[]>([]);
  const [filterPosition, setFilterPosition] = useState<string>();
  const [filterLevel, setFilterLevel] = useState<string>();


  const [dataTable, setDataTable] = useState<{
    name: string,
    published: string,
    sent: number,
    submitted: number,
    author: string,
    position: string,
    level: string,
  }[]>([])
  const { apiClient } = useApiClient()

  useEffect(() => {
    fetchingListTest({
      publicationState: tabActive as PublicationState,
      pagination: { page: paging.page, pageSize: paging.pageSize },
      filters: { position: { name: { eq: filterPosition }}, level: { eq: filterLevel }}
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive, paging, filterPosition, filterLevel]);

  useEffect(() => {
    getPositions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchingListTest = async (variants?: GetTestsQueryVariables) => {
    const res = await apiClient.getTests(variants);
    const dataTransform = transformListTest(res.tests.data as TestEntity[]);
    const metaData = res.tests.meta;
    setTotalItem(metaData.pagination.total)
    setDataTable(dataTransform)
  }

  const getPositions = async () => {
    const res = await apiClient.getPositions({ sort: ["name"] });
    const dataTransform = transformPositions(res?.positions?.data || []);
    setOtpPositions(dataTransform);
  }

  const onClearFilter = () => {
    setPaging({ page: 1, pageSize: 10 });
    setTabActive(PublicationState.Preview);
    setFilterPosition(undefined);
    setFilterLevel(undefined)
  };

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
            value={!filterPosition ? "" : filterPosition}
            options={otpPositions}
            onChange={(value) => setFilterPosition((value.length < 0 || !value) ? undefined : value)}
          />
          <Select
            label="Level"
            value={!filterLevel ? "" : filterLevel}
            options={getLevelPosition()}
            onChange={(value) => setFilterLevel((value.length < 0 || !value) ? undefined : value)}
          />
          <span className="w-6 h-0 border border-solid border-neutral-disable rotate-90"></span>
          <div className="flex items-center w-fit cursor-pointer" onClick={onClearFilter}>
            <p className="mr-2 font-medium text-13 leading-6 text-primary-base">Clear filter</p>
            <Icon name="refresh" className='text-primary-base' />
          </div>
        </div>

        {/** TABLE CONTENT */}
        <Table
          rows={dataTable}
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
              render: (row) => <span className="text-neutral-text-primary text-13 leading-6 capitalize">{row.level}</span>,
            },
            {
              title: 'Action',
              render: () => <div className="flex items-center gap-3">
                <span className="cursor-pointer" onClick={() => alert("Edit")}><Icon name="edit" className="text-[#1B1D29] gap-3" /></span>
                <span className="cursor-pointer" onClick={() => alert("Delete")}><Icon name="remove" className="text-[#1B1D29] gap-3" /></span>
              </div>,
            },
          ]}
          className="w-full mt-6"
        />

        <div className="mt-6 flex justify-between">
          <span className="text-13 leading-6 text-neutral-text-primary">Total test: {totalItem}</span>
          <div>
            <Paging
              currentPage={paging.page}
              totalItem={totalItem}
              onChangePage={(page) => setPaging({ ...paging, page: page })}
              onChangeRowsPerPage={(row) => setPaging({ ...paging, pageSize: row, page: 1 })}
              rowsPerPage={paging.pageSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
