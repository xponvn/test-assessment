export const basicTest = async (_, { id }) => {
  // @ts-expect-error due to no typing
  const { toEntityResponse } = strapi.service(
    'plugin::graphql.format'
  ).returnTypes;
  const testEntity = await strapi.entityService.findOne('api::test.test', id, {
    fields: ['name', 'level', 'timeLimit'],
    populate: { position: true, questions: true, answers: true },
  });

  if (!testEntity) {
    throw new Error('The test does not exists.');
  }

  const questionTypes = testEntity.questions?.map((question) => {
    if (question.__component === 'question.question') {
      return 'Long answer';
    } else if (question.__component === 'question.choice-question') {
      return 'Single-choice';
    }
  });

  const basicTestInfo = {
    id: testEntity.id,
    name: testEntity.name,
    level: testEntity.level,
    timeLimit: testEntity.timeLimit,
    position: testEntity.position,
    numberOfQuestions: testEntity.questions?.length,
    questionTypes,
  };

  return toEntityResponse(basicTestInfo);
};
