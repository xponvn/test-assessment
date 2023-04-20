import {
  ComponentQuestionChoiceQuestion,
  ComponentQuestionQuestion,
  Enum_Test_Level,
  PositionEntity,
} from '@test-assessment/cms-graphql-api';
import { QuestionLevel, QuestionItemType, QuestionType } from './type';
import { SelectOption } from '../components/form-base/select';

export const getPoint = (level: QuestionLevel) => {
  if (level === QuestionLevel.Easy) return 1;
  if (level === QuestionLevel.Medium) return 2;
  return 3;
};

export const getQuestionType = (type: QuestionType) => {
  if (type === QuestionType.SingleChoice) return 'Single choice';
  if (type === QuestionType.MultipleChoice) return 'Multiple choice';
  return 'Free text';
};

export const getAnswerCorrect = (
  type: QuestionType,
  correctAnswer: string | string[]
): number[] => {
  if (type === QuestionType.SingleChoice) {
    const correctIndex = (correctAnswer as string).split('-')[1];
    return [Number(correctIndex)];
  }
  return (correctAnswer as string[]).map((item) => Number(item.split('-')[1]));
};

export const getTotalPoint = (questions: QuestionItemType[]) => {
  let total = 0;
  questions.map((item) => {
    total += getPoint(item.level);
  });
  return total;
};

export const transformQuestion = (items: QuestionItemType[]) => {
  return items.map((item) => {
    if (item.type === QuestionType.FreeText)
      return {
        content: item.content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        level: item.level as any,
        __typename: 'ComponentQuestionQuestion',
      } as ComponentQuestionQuestion;
    const answers = transformAnswers(
      item.answers,
      item.correctAnswer,
      item.type
    );

    return {
      content: item.content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      level: item.level as any,
      answers: answers,
      __typename: 'ComponentQuestionChoiceQuestion',
    } as ComponentQuestionChoiceQuestion;
  });
};

const transformAnswers = (
  answers: { content: string }[],
  correctAnswers: string | string[],
  questionType: QuestionType
) => {
  const newCorrectAnswers =
    questionType === QuestionType.SingleChoice
      ? [correctAnswers]
      : [...correctAnswers];
  const correctAnswerIndex = newCorrectAnswers.map((item: string) => {
    const index = item.split('-')[1];
    return index;
  });
  return answers.map((item, index) => {
    return {
      content: item.content,
      isCorrect: correctAnswerIndex.includes(String(index)),
    };
  });
};

export const transformPositions = (items: PositionEntity[]): SelectOption[] => {
  return items.map((item) => ({
    label: item.attributes.name,
    value: item.id,
  }));
};

export const getLevelPosition = (): SelectOption[] => {
  return [
    {
      label: Enum_Test_Level.Interm,
      value: Enum_Test_Level.Interm,
    },
    {
      label: Enum_Test_Level.Fresher,
      value: Enum_Test_Level.Fresher,
    },
    {
      label: Enum_Test_Level.Junior,
      value: Enum_Test_Level.Junior,
    },
    {
      label: Enum_Test_Level.MidLevel,
      value: Enum_Test_Level.MidLevel,
    },
    {
      label: Enum_Test_Level.Senior,
      value: Enum_Test_Level.Senior,
    },
    {
      label: Enum_Test_Level.Lead,
      value: Enum_Test_Level.Lead,
    },
  ];
};
