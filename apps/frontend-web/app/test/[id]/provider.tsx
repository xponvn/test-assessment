'use client';

import React, { createContext, useEffect, useState } from 'react';

export type Candidate = {
  email: string;
  name: string;
};

export type InviteCandidateInput = {
  selectedCandidate: Candidate;
  candidatesEmails: string;
};

export type TestContextType = {
  testId: number;
  setTestId: React.Dispatch<React.SetStateAction<number>>;

  candidates?: Candidate[];
};

export const TestContext = createContext<TestContextType>({
  testId: 1,
  candidates: [
    { name: 'Carl Sagan (carlsagan@gmail.com)', email: 'foo@bar.com' },
    { name: 'Donald Trump (donaldtrump@gmail.com)', email: 'bar@bar.com' },
    { name: 'Joma Tech (jomatech@gmail.com)', email: 'bar@bar.com' },
  ],
  setTestId: (_testId: number) => null,
});

const TestProvider = () => {
  const [testId, setTestId] = useState(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchAndSetCd = async () => {
      const candidates = await Promise.resolve([]);
      setCandidates(candidates);
    };

    fetchAndSetCd();
  }, []);

  return (
    <TestContext.Provider value={{ testId, setTestId, candidates }}>
      TestProvider
    </TestContext.Provider>
  );
};

export default TestProvider;

export const useTestContext = () => React.useContext(TestContext);
