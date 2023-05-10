import { Button } from '@test-assessment/ui-components';
import React from 'react';

const PageTopBar = ({ handleClick, setShowModal, onDuplicateTest, testId }) => {
  return (
    <div className="banner flex justify-between p-10">
      <div className="right">
        <h1 className="text-2xl font-semibold">Test 1</h1>
      </div>
      <div className="left flex space-x-4">
        <Button type="button" onClick={handleClick}>
          View Test
        </Button>
        <Button type="button" onClick={handleClick}>
          Delete Test
        </Button>
        <Button type="button" onClick={() => onDuplicateTest(testId)}>
          Duplicate Test Duplicate Test
        </Button>

        <Button type="button" onClick={() => setShowModal(true)}>
          Invite Candidate
        </Button>
      </div>
    </div>
  );
};

export default PageTopBar;
