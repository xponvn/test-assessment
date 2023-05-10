'use client';

import { Button, Icon, Table } from '@test-assessment/ui-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InputSearch from '../components/input-search';
import Paging from '../components/paging';
import Modal from './component/modal';
import PageTopBar from './component/top-bar';
import { transformedIndData } from './mock';
import {
  formatCompletedTime,
  formatOnDate,
  formatScoreString,
} from './utils/helper';
import useTestDetail from './utils';

const Page = ({ params }) => {
  const MAX_SCORE = 100;
  const [showModal, setShowModal] = useState(false);
  const testId = params['id'];
  const router = useRouter();
  const { onDuplicateTest, loading, testDuplicateId } = useTestDetail();
  const [dataTable, setDataTable] = useState<
    {
      id?: string;
      name: string;
      email: string;
      invitedOn: string;
      completedOn: string;
      completedIn: number;
      score: number;
      result: string;
    }[]
  >(transformedIndData);

  const handleClick = () => {
    console.log('clicked');
  };

  useEffect(() => {
    if (testDuplicateId) return router.push(`/test/${testDuplicateId}/edit`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDuplicateId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <PageTopBar
        handleClick={handleClick}
        setShowModal={setShowModal}
        onDuplicateTest={onDuplicateTest}
        testId={testId}
      />
      <div className="candidate-table m-10 p-5 border">
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
              accessor: 'name',
              sortable: true,
              dataType: 'string',
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
              accessor: 'invitedOn',
              sortable: true,
              dataType: 'date',
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {formatOnDate(row.invitedOn)}
                </span>
              ),
            },
            {
              title: 'Completed on',
              accessor: 'completedOn',
              dataType: 'date',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {formatOnDate(row.completedOn)}
                </span>
              ),
            },
            {
              title: 'Completed in',
              accessor: 'completedIn',
              dataType: 'number',
              sortable: true,
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {formatCompletedTime(row.completedIn)}
                </span>
              ),
            },
            {
              title: 'Score',
              accessor: 'score',
              sortable: true,
              dataType: 'number',
              render: (row) => (
                <span className="text-neutral-text-primary text-13 leading-6 capitalize">
                  {formatScoreString(row.score, MAX_SCORE)}
                </span>
              ),
            },
            {
              title: 'Result',
              accessor: 'result',
              sortable: true,
              dataType: 'string',
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
        <Button
          type="button"
          onClick={() => router.back()}
          className="bg-transparent"
          LeftIcon={<Icon name="arrow-back" />}
        >
          Go Back
        </Button>
      </div>
    </>
  );
};

export default Page;
