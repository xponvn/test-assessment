export type TestInfoType = {
  name: string;
  position: string;
  levelPosition: string;
  timeLimit: string;
  passingScore: string;
}

export interface TestItem extends TestInfoType  {
  questions: QuestionItemType[]
}

export type QuestionItemType = {
  content: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  correctAnswer: string | string[];
  answers: {
    content: string
  }[]
}

export enum QuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum QuestionType {
  SingleChoice= 'SingleChoice',
  MultipleChoice= 'MultipleChoice',
  FreeText= 'FreeText',
}