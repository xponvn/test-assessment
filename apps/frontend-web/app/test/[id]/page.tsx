'use client';

import { useEffect, useState } from 'react';
import Modal from './component/modal';
import useTestDetail from './utils';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const testId = params["id"];
  const router = useRouter();
  const { onDuplicateTest, loading, testDuplicateId } = useTestDetail();

  useEffect(() => {
    if (testDuplicateId) return router.push(`/test/${testDuplicateId}/edit`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDuplicateId]);
  
  return (
    <>
      <div className="banner flex justify-between p-10">
        <div className="right">
          <h1 className="text-2xl font-semibold">Test 1</h1>
        </div>
        <div className="left">
          <button
            className="bg-pink-500 active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            View Test
          </button>
          <button
            className="bg-pink-500 active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Delete Test
          </button>
          <button
            className="bg-pink-500 active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => onDuplicateTest(testId)}
          >
            {loading && `loading...`} Duplicate Test
          </button>
          <button
            className="bg-pink-500 active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Invite Candidate
          </button>
        </div>
      </div>
      <div className="candidate-table m-10 p-5 border h-64">
        <div className="table-top flex justify-between">
          <p className="font-semibold">List of candidates taken test</p>
          <div className="search-candidate">
            <input className="border" />
            <button className="border">Search</button>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Page;
