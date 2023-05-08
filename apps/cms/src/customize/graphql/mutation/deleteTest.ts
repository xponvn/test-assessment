export const deleteTest = async (_, { id }) => {
  // @ts-expect-error due to no typing
  const { toEntityResponse } = strapi.service(
    'plugin::graphql.format'
  ).returnTypes;
  const testEntity = await strapi.entityService.findOne('api::test.test', id, {
    fields: ['publishedAt'],
  });
  if (!testEntity) {
    throw new Error('Cannot find a test with that ID.');
  }
  if (testEntity.publishedAt) {
    const individualEntities = await strapi.entityService.findMany(
      'api::individual-test.individual-test',
      {
        fields: ['id'],
        filters: { test: id },
      }
    );
    await Promise.all(
      individualEntities.map(({ id }) =>
        strapi.entityService.delete('api::individual-test.individual-test', id)
      )
    );
  }
  const entity = await strapi.entityService.delete('api::test.test', id);
  return toEntityResponse(entity);
};
