"use client"
import React, { useEffect, useState } from 'react'
import TabFilter from './components/tab-filter'
import Select from './components/select'
import { Icon, Table } from '@test-assessment/ui-components'
import clsx from 'clsx'
import PieChart from './components/pie-chart'
import Paging from './components/paging'
import { CountByStatus, GetTestsQueryVariables, PublicationState, TestEntity, useApiClient } from '@test-assessment/cms-graphql-api'
import { transformListTest } from './utils/helper'
import { getLevelPosition, transformPositions } from './add/utils'
import { SelectOption } from './add/components/form-base/select'
import { useSearchParams } from 'next/navigation'

const options = [{ label: "All", value: PublicationState.Preview }, { label: "Published", value: PublicationState.Live }, { label: "Draft", value: "DRAFT" }]
export default function TestPage() {
  const [otpPositions, setOtpPositions] = useState<SelectOption[]>([]);

  const [tabActive, setTabActive] = useState<string>(PublicationState.Preview)
  const [totalItem, setTotalItem] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [countByStatus, setCountByStatus] = useState<CountByStatus>({ draft: 0, published: 0 })
  const searchKey = searchParams.get('q') || "";

  const [filterVariants, setFilterVariants] = useState<GetTestsQueryVariables>({
    publicationState: PublicationState.Preview,
    pagination: {
      page: 1,
      pageSize: 10
    },
    filters: {
      name: { contains: searchKey },
      position: { name: { eq: undefined } },
      level: { eq: undefined },
      publishedAt: { eq: undefined }
    }
  });

  useEffect(() => {
    setFilterVariants({ ...filterVariants, filters: { ...filterVariants.filters, name: { containsi: searchKey } } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey])


  const [dataTable, setDataTable] = useState<{
    id?: string
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
    fetchingListTest({ ...filterVariants });
    fetchingCountTestByStatus({ ...filterVariants })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterVariants]);

  useEffect(() => {
    getPositions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchingListTest = async (variants?: GetTestsQueryVariables) => {
    if (loading) return;
    setLoading(true);
    const res = await apiClient.getTests(variants);
    setLoading(false);
    const dataTransform = transformListTest(res.tests.data as TestEntity[]);
    const metaData = res.tests.meta;
    setTotalItem(metaData.pagination.total);
    setDataTable(dataTransform)
  }

  const fetchingCountTestByStatus = async (variants?: GetTestsQueryVariables) => {
    const res = await apiClient.getCountTestByStatus({ ...variants, publicationState: PublicationState.Preview, filters: { ...variants.filters, publishedAt: { eq: undefined } } });
    const metaData = res.tests.meta;
    setCountByStatus(metaData.countByStatus);

  }

  const onRemoveTestItem = async (id?: string) => {
    if (!id) return alert("Item not found.")
    const res = await apiClient.deleteTest({ id });
    if (res.deleteTest?.data?.attributes?.name) return alert("Delete item success.");
  }

  const getPositions = async () => {
    const res = await apiClient.getPositions({ sort: ["name"] });
    const dataTransform = transformPositions(res?.positions?.data || []);
    setOtpPositions(dataTransform);
  }

  const onClearFilter = () => {
    setTabActive(PublicationState.Preview)
    setFilterVariants({
      publicationState: PublicationState.Preview,
      pagination: {
        page: 1,
        pageSize: 10
      },
      filters: {
        name: { contains: searchKey },
        position: { name: { eq: undefined } },
        level: { eq: undefined },
        publishedAt: { eq: undefined }
      }
    })
  };

  const onFilterState = (value: string) => {
    setTabActive(value)
    if (value === "DRAFT") {
      return setFilterVariants({ ...filterVariants, publicationState: PublicationState.Preview, filters: { ...filterVariants.filters, publishedAt: { eq: null } } })
    }
    setFilterVariants({ ...filterVariants, publicationState: value as PublicationState, filters: { ...filterVariants.filters, publishedAt: undefined } })
  }

  return (
    <div className="bg-neutral-table-header h-full" style={{ background: "#F3F0F5" }}>
      <div className="container mx-auto bg-neutral-white p-6 -translate-y-[128px]">
        {/** HEADER */}
        <div className="flex items-center gap-8 flex-wrap">
          <TabFilter
            countByStatus={countByStatus}
            options={options}
            onChange={onFilterState}
            active={tabActive}
          />
          <Select
            label="Job position"
            value={!filterVariants.filters.position.name.eq ? "" : filterVariants.filters.position.name.eq as string}
            options={otpPositions}
            onChange={(value) => setFilterVariants({ ...filterVariants, filters: { ...filterVariants.filters, position: { name: { eq: (value.length < 0 || !value) ? undefined : value } } } })}
          />
          <Select
            label="Level"
            value={!filterVariants.filters.level.eq ? "" : filterVariants.filters.level.eq as string}
            options={getLevelPosition()}
            onChange={(value) => setFilterVariants({ ...filterVariants, filters: { ...filterVariants.filters, level: { eq: (value.length < 0 || !value) ? undefined : value } } })}
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
              render: (row) => <div className="flex items-center gap-3">
                <span className="cursor-pointer" onClick={() => alert("Edit")}><Icon name="edit" className="text-[#1B1D29] gap-3" /></span>
                <span className="cursor-pointer" onClick={() => onRemoveTestItem(row.id)}><Icon name="remove" className="text-[#1B1D29] gap-3" /></span>
              </div>,
            },
          ]}
          className="w-full mt-6"
        />

        <div className="mt-6 flex justify-between">
          <span className="text-13 leading-6 text-neutral-text-primary">Total test: {totalItem}</span>
          <div>
            <Paging
              currentPage={filterVariants.pagination.page}
              totalItem={totalItem}
              onChangePage={(page) => setFilterVariants({ ...filterVariants, pagination: { ...filterVariants.pagination, page: page } })}
              onChangeRowsPerPage={(row) => setFilterVariants({ ...filterVariants, pagination: { pageSize: row, page: 1 } })}
              rowsPerPage={filterVariants.pagination.pageSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
