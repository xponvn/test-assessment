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
  id?: string
  content: string;
  level: QuestionLevel;
  type: QuestionType;
  answers?: {
    id?: string
    content: string
    isCorrect: boolean
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
