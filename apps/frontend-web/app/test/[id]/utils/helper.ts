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
    const level =
      item.__typename === 'ComponentQuestionQuestion'
        ? item?.questionLevel
        : item?.choiceQuestionLevel;
    return {
      content: item.content,
      level: level,
      answers: (item?.answers || []).map((aItem) => ({
        content: aItem.content,
        isCorrect: aItem.isCorrect,
      })),
      __typename: item?.__typename,
    };
  });
};
// millisecond
export const formatCompletedTime = (milliseconds: number) => {
  if (!milliseconds) return '-';

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  let timeString = '';

  if (hours) {
    timeString += `${hours}h`;
  }

  if (minutes) {
    timeString += `${minutes}m`;
  }
  if (seconds) {
    timeString += `${seconds}s`;
  }

  return timeString;
};

export const formatOnDate = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export const formatScoreString = (score: number, maxScore: number): string => {
  if (!score) return '-';

  return `${score}/${maxScore} (${(score / maxScore) * 100}%)`;
};
