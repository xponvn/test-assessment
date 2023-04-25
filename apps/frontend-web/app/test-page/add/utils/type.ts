export type TestInfoType = {
  name: string;
  position: string;
  levelPosition: string;
  timeLimit: number;
  passingScore: string;
}

export interface TestItem extends TestInfoType  {
  questions: QuestionItemType[]
}

export type QuestionItemType = {
  content: string;
  level: QuestionLevel;
  type: QuestionType;
  correctAnswer: string | string[];
  answers: {
    content: string
  }[]
}

export enum QuestionLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum QuestionType {
  SingleChoice= 'SingleChoice',
  MultipleChoice= 'MultipleChoice',
  FreeText= 'FreeText',
}