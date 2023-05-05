import {
  ComponentQuestionChoiceQuestion,
  ComponentQuestionQuestion,
  Enum_Test_Level,
  PositionEntity,
  TestInput,
} from '@test-assessment/cms-graphql-api';
import { QuestionLevel, QuestionItemType, QuestionType, TestInfoType } from './type';
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
        level: item.level as any,
        __typename: 'ComponentQuestionQuestion',
      } as ComponentQuestionQuestion;

    return {
      content: item.content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      level: item.level as any,
      answers: item.answers,
      __typename: 'ComponentQuestionChoiceQuestion',
    } as ComponentQuestionChoiceQuestion;
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
      label: Enum_Test_Level.Mid,
      value: Enum_Test_Level.Mid,
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

export const transformDataSubmit = (data: TestInfoType, questions: QuestionItemType[]): TestInput => {
  const questionsTransform = transformQuestion(questions);
  return {
    name: data.name,
    passingScore: Number(data.passingScore),
    timeLimit: Number(data.timeLimit),
    questions: questionsTransform,
    position: data.position,
    level: data.levelPosition as Enum_Test_Level,
    publishedAt: data.publishedAt
  }
}
