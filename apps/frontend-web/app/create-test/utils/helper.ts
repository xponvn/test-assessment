import { QuestionLevel, QuestionItemType, QuestionType } from './type';

export const getPoint = (level: QuestionLevel) => {
  if (level === QuestionLevel.Easy) return 1;
  if (level === QuestionLevel.Medium) return 2;
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

export const getTotalPoint = (questions: QuestionItemType[]) => {
  let total = 0;
  questions.map(item => {
    total += getPoint(item.level)
  });
  return total;
};

export const transformQuestion = (items: QuestionItemType[]) => {
  
  return items.map(item => {
    if(item.type === QuestionType.FreeText) return { content: item.content, level: item.level };
    const answers = transformAnswers(item.answers, item.correctAnswer, item.type);

    return {
      content: item.content,
      level: item.level,
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