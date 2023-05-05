import { Candidate } from '../provider';

export const transformCandidates = (candidates: Candidate[]) => {
  return candidates?.map((item) => ({
    ...item,
    label: item.name,
    value: item.name,
  }));
};
