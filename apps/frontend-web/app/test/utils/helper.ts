import { TestEntity, TestQuestionsDynamicZone } from '@test-assessment/cms-graphql-api';
import { QuestionItemType, QuestionType, TestItem } from '../add/utils';



export const transformListTest = (data: TestEntity[]) => {
  return data.map((item) => {
    const attributes = item.attributes;
    const position = attributes.position;
    return {
      id: item.id,
      name: attributes.name,
      published: attributes.publishedAt,
      sent: 1,
      submitted: 1,
      author: 'hien.nguyen@xpon.ai',
      position: position?.data?.attributes?.name || '__',
      level: attributes.level,
    };
  });
};


export const transformTestData = (data: TestEntity): TestItem => {
  return {
    ...data.attributes,
    position: data.attributes.position?.data?.id ?? '',
    levelPosition: data.attributes.level,
    passingScore: data.attributes.passingScore.toString(),
    questions: transformQuestionData(data.attributes.questions),
  };
};

const transformQuestionData = (
  questions: TestQuestionsDynamicZone[]
): QuestionItemType[] => {
  const formattedQuestions = questions
    .map((question) => {
      if (question.__typename === 'Error') return null;
      else {
        return {
          id: question.id,
          content: question.content,
          level:
            question.__typename === 'ComponentQuestionQuestion'
              ? (question as any).questionLevel.toString() // because I use field alias for graphql query
              : (question as any).choiceQuestionLevel.toString(),
          type:
            question.__typename === 'ComponentQuestionQuestion'
              ? QuestionType.FreeText
              : question.answers?.filter((answer) => answer.isCorrect).length >
                1
              ? QuestionType.MultipleChoice
              : QuestionType.SingleChoice,
          answers:
            question.__typename === 'ComponentQuestionQuestion'
              ? undefined
              : question.answers.map((answer) => {
                  return {
                    id: answer.id,
                    isCorrect: answer.isCorrect,
                    content: answer.content,
                  };
                }),
        };
      }
    })
    .filter((question) => !!question);
  return formattedQuestions;
};
