/* eslint-disable react/no-children-prop */
'use client';

import {
  CandidateEntity,
  GetCandidatesQueryVariables,
  PublicationState,
  useApiClient,
} from '@test-assessment/cms-graphql-api';
import { useSearchParams } from 'next/navigation';
import {
  Button,
  Icon,
  Input,
  Pagination,
  SelectBox,
  SelectBoxOption,
  Table,
} from '@test-assessment/ui-components';
import { useEffect, useRef, useState } from 'react';
import {
  CandidateRowData,
  searchQueryField,
  transformListCandidates,
} from './utils/helps';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { apiClient } = useApiClient();
  const router = useRouter();
  const searchRef = useRef(null);

  const [dataTable, setDataTable] = useState<CandidateRowData[]>([]);
  const [otpPositions, setOtpPositions] = useState<SelectBoxOption[]>([]);
  const searchParams = useSearchParams();
  const searchKey = searchParams.get('q') || '';
  const [selectedPosition, setSelectedPosition] = useState(null);
  // TODO: paging will do later
  const [totalItem, setTotalItem] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterVariants, setFilterVariants] =
    useState<GetCandidatesQueryVariables>({
      publicationState: PublicationState.Live,
      pagination: {
        page: 1,
        pageSize: 10,
      },
      filters: {},
    });
  useEffect(() => {
    const currentFilter = { ...filterVariants };
    if (!searchKey && !selectedPosition) {
      currentFilter.filters = {};
    }
    if (!searchKey && selectedPosition) {
      currentFilter.filters = { position: { eq: selectedPosition } };
    }
    if (searchKey) {
      // search in multiple field
      console.log(searchQueryField);
      const candidateFilterInputs = searchQueryField.map((item) => {
        return {
          [item]: { contains: searchKey },
          position: { eq: selectedPosition ? selectedPosition : undefined },
        };
      });
      currentFilter.filters = { or: candidateFilterInputs };
    }
    setFilterVariants(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, selectedPosition]);

  useEffect(() => {
    fetchingListCandidates({ ...filterVariants });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterVariants]);

  const fetchingListCandidates = async (
    variants?: GetCandidatesQueryVariables
  ) => {
    if (loading) return;
    setLoading(true);
    const res = await apiClient.getCandidates(variants);
    setLoading(false);
    const dataTransform = transformListCandidates(
      res.candidates.data as CandidateEntity[]
    );
    const metaData = res.candidates.meta;
    setTotalItem(metaData.pagination.total);
    setDataTable(dataTransform);
  };

  const onRemoveItem = async (id?: string) => {
    if (!id) return alert('Item not found.');
    const res = await apiClient.deleteCandidate({ id });
    if (res.deleteCandidate?.data?.attributes?.email)
      return alert('Delete item success.');
  };

  const getPositions = async () => {
    const res = await apiClient.getPositions({ sort: ['name'] });
    const dataTransform = (res?.positions?.data || []).map((item) => {
      return {
        name: item.attributes?.name,
        value: item.attributes?.name,
      };
    });
    dataTransform.unshift({ name: 'All position', value: '' });
    setOtpPositions(dataTransform);
  };
  useEffect(() => {
    getPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-neutral-bg h-full">
      <div className="container mx-auto flex items-center justify-between pt-[45px] px-6">
        <div>
          <div className="text-[#8C8C8C] text-13 leading-5">
            Test Management
          </div>
          <div className="font-bold	text-neutral-text-primary text-32 leading-[48px]">
            Candidates
          </div>
        </div>
        <Button
          onClick={() => {
            alert('add');
          }}
          type="button"
          children={
            <span className="text-neutral-text-primary text-13">
              Add Candidate
            </span>
          }
        />
      </div>
      <div className="container mx-auto bg-neutral-white mb-6 px-6 pt-6 pb-11 mt-6">
        <div className="flex pb-8 items-center flex-col md:flex-row justify-between">
          <Input
            defaultValue={searchKey}
            ref={searchRef}
            onSubmit={(e) =>
              router.push(`/candidates?q=${searchRef.current.value}`)
            }
            placeholder="Search by test name, email phone number"
            type="search"
          />
          <SelectBox
            className="min-w-[320px]"
            rightIcon={
              <Icon name="arrow-down" className="text-neutral-placeholder" />
            }
            options={otpPositions}
            onChange={(value) => setSelectedPosition(value)}
            variant={'horizontal-label'}
            size="medium"
          />
        </div>
        <Table
          className="w-full"
          rows={dataTable}
          columns={[
            {
              title: 'Name',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.name}
                </span>
              ),
            },
            {
              title: 'Emai',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.email}
                </span>
              ),
            },
            {
              title: 'Phone number',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.phone}
                </span>
              ),
            },
            {
              title: 'Role',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.role}
                </span>
              ),
            },
            {
              title: 'Level',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.level}
                </span>
              ),
            },
            {
              title: 'Create by',
              render: (row) => (
                <span className="text-neutral-text-primary text-15 leading-6">
                  {row.author}
                </span>
              ),
            },

            {
              title: '',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => alert('Edit')}
                  >
                    <Icon
                      name="edit"
                      className="text-neutral-placeholder gap-3"
                    />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => onRemoveItem(row.id)}
                  >
                    <Icon
                      name="remove"
                      className="text-neutral-placeholder gap-3"
                    />
                  </span>
                </div>
              ),
            },
          ]}
        />
        <div className="flex items-center justify-center mt-2">
          <Pagination
            currentRowsPerPage={filterVariants.pagination.pageSize}
            currentPage={filterVariants.pagination.page}
            totalPage={Math.ceil(
              totalItem / filterVariants.pagination.pageSize
            )}
            onChangePage={(page) => {
              setFilterVariants({
                ...filterVariants,
                pagination: { ...filterVariants.pagination, page: page },
              });
            }}
            onChangeRows={(rowPerPage) => {
              setFilterVariants({
                ...filterVariants,
                pagination: {
                  ...filterVariants.pagination,
                  pageSize: rowPerPage,
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
