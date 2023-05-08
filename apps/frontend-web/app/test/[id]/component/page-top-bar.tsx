import React from 'react';
import Button from '../../components/button';

const PageTopBar = ({ handleClick, setShowModal }) => {
  return (
    <div className="banner flex justify-between p-10">
      <div className="right">
        <h1 className="text-2xl font-semibold">Test 1</h1>
      </div>
      <div className="left flex space-x-4">
        <Button label="View Test" onClick={handleClick} style="style_2" />
        <Button label="Delete Test" onClick={handleClick} style="style_2" />
        <Button label="Duplicate Test" onClick={handleClick} style="style_2" />
        <Button
          label="Invite Candidate"
          onClick={() => setShowModal(true)}
          style="style_2"
        />
      </div>
    </div>
  );
};

export default PageTopBar;
