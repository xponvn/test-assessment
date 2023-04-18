import { QuestionDifficulty, QuestionType } from './type';

export const getPoint = (difficulty: QuestionDifficulty) => {
  if (difficulty === QuestionDifficulty.Easy) return 1;
  if (difficulty === QuestionDifficulty.Medium) return 2;
  return 3;
};

export const getQuestionType = (type: QuestionType) => {
  if(type === QuestionType.SingleChoice) return "Single choice";
  if(type === QuestionType.MultipleChoice) return "Multiple choice";
  return "Free text";
}

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
