import { QuestionDifficulty, QuestionItemType, QuestionType } from './type';

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

export const transformQuestion = (items: QuestionItemType[]) => {
  
  return items.map(item => {
    if(item.type === QuestionType.FreeText) return { level: item.difficulty };
    const answers = transformAnswers(item.answers, item.correctAnswer, item.type);
    console.log("answers:", answers)
    return {
      content: item.content,
      level: item.difficulty,
      answers: answers
    }
  })
}

const transformAnswers = (answers: { content: string }[], correctAnswers: string | string[], questionType: QuestionType) => {
  const newCorrectAnswers= questionType === QuestionType.SingleChoice ? [correctAnswers] : [...correctAnswers];
  const correctAnswerIndex = newCorrectAnswers.map((item: string) => {
    const index = item.split('-')[1];
    return index;
  })
  return answers.map((item, index) => {
    return {
      content: item.content,
      isCorrect: correctAnswerIndex.includes(String(index))
    }
  })
}