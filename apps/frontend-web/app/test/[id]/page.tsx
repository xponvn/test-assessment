'use client';

import { useState } from 'react';
import Modal from './component/modal';
import PageTopBar from './component/page-top-bar';
import { Table } from '@test-assessment/ui-components';
import InputSearch from '../components/input-search';
import Paging from '../components/paging';
import { useApiClient } from '@test-assessment/cms-graphql-api';
import Button from '../components/button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    console.log('clicked');
  };
  const MAX_SCORE = 100;
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [dataTable, setDataTable] = useState<
    {
      id?: string;
      name: string;
      email: string;
      invitedOn: string;
      completedOn: string;
      completedIn: string;
      score: number;
      result: string;
    }[]
  >([
    {
      name: 'Joma Tech',
      email: 'to@example.com',
      invitedOn: 'April 1st, 2023',
      completedOn: 'April 1st, 2023',
      completedIn: '10m12s',
      score: 80,
      result: 'passed',
    },
  ]);

  const { apiClient } = useApiClient();

  const getIndividualList = async () => {
    console.log('getIndividual List');
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <PageTopBar handleClick={handleClick} setShowModal={setShowModal} />
      <div className="candidate-table m-10 p-5 border h-64">
        <div className="table-top flex justify-between pb-6">
          <p className="font-semibold">List of candidates taken test</p>
          <div className="search-candidate">
            <InputSearch
              onSearch={(value) => {
                console.log(value);
              }}
              className="w-[448px] mr-6"
            />
          </div>
        </div>
        <Table
          className="w-full"
          rows={dataTable}
          columns={[
            {
              title: 'Candidate name',
              accessor: 'candidate_name',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6">
                  {row.name}
                </span>
              ),
            },
            {
              title: 'Email',
              accessor: 'email',
              sortable: false,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6">
                  {row.email}
                </span>
              ),
            },
            {
              title: 'Invited on',
              accessor: 'invited_on',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {row.invitedOn ?? '-'}
                </span>
              ),
            },
            {
              title: 'Completed on',
              accessor: 'completed_on',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {row.completedOn ?? '-'}
                </span>
              ),
            },
            {
              title: 'Completed in',
              accessor: 'completed_in',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {row.completedIn ?? '-'}
                </span>
              ),
            },
            {
              title: 'Score',
              accessor: 'score',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {row.score
                    ? `${row.score}/${MAX_SCORE} (${
                        (row.score / MAX_SCORE) * 100
                      }%)`
                    : '-'}
                </span>
              ),
            },
            {
              title: 'Result',
              accessor: 'result',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {row.result ?? '-'}
                </span>
              ),
            },
          ]}
        />

        <div className="mt-6 flex justify-between">
          <span className="text-13 leading-6 text-neutral-text-primary">
            Total test: {100}
          </span>
          <div>
            <Paging
              currentPage={1}
              totalItem={100}
              onChangePage={(page) => console.log('on change')}
              rowsPerPage={20}
            />
          </div>
        </div>
      </div>
      <div className="ml-5">
        <Button label="go back" onClick={() => router.back()} />
      </div>
    </>
  );
};

export default Page;
