'use client';

import { TestInput, useApiClient } from '@test-assessment/cms-graphql-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from './component/modal';
import { transformQuestionDuplicate } from './utils/helper';

const Page = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const testId = params["id"];
  const { apiClient } = useApiClient()
  const router = useRouter();

  const onDuplicateTest = async () => {
    try {
      const res = await apiClient.getDetailTest({ id: testId });
      const testDetail = res.test.data;
      if (!testDetail) return alert("Test not found.");
      const testDetailAtr = testDetail.attributes;
      const newTest: TestInput = {
        name: `${testDetailAtr.name} ( Copy )`,
        passingScore: testDetailAtr.passingScore,
        timeLimit: testDetailAtr.timeLimit,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        questions: transformQuestionDuplicate(testDetailAtr.questions as any),
        position: testDetailAtr.position.data.id,
        level: testDetailAtr.level,
        publishedAt: null
      };
      const resDuplicateTest = await apiClient.createTest({ data: newTest });
      const testDuplicateId = resDuplicateTest.createTest.data.id;
      if (testDuplicateId) return router.push(`/test/${testId}/edit`);
      alert("Duplicate fail, pls check again.");
    } catch (err) {
      const errors = err?.response?.errors || [];
      const messErrors = errors.map(item => item.message);
      if (messErrors.length > 0) return alert(messErrors[0])
    }
  };

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
            onClick={onDuplicateTest}
          >
            Duplicate Test
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
