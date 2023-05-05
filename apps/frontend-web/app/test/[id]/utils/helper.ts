import {
  ComponentQuestionChoiceQuestion,
  ComponentQuestionQuestion,
} from '@test-assessment/cms-graphql-api';
import { Candidate } from '../provider';

export const transformCandidates = (candidates: Candidate[]) => {
  return candidates?.map((item) => ({
    ...item,
    label: item.name,
    value: item.name,
  }));
};

export const transformQuestionDuplicate = (
  items: ComponentQuestionQuestion[] | ComponentQuestionChoiceQuestion[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return items.map((item: any) => {
    return {
      content: item.content,
      level: item.level,
      answers: (item?.answers || []).map((aItem) => ({
        content: aItem.content,
        isCorrect: aItem.isCorrect,
      })),
      __typename: 'ComponentQuestionChoiceQuestion',
    };
  });
};
