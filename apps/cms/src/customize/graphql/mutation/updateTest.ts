export const updateTest = async (_, args) => {
  const { id, data } = args;
  // @ts-expect-error due to no typing
  const { toEntityResponse } = strapi.service(
    'plugin::graphql.format'
  ).returnTypes;
  const entity = await strapi.db.query('api::test.test').findOne({
    where: { $and: [{ id }, { publishedAt: { $null: true } }] },
  });
  if (!entity) {
    throw new Error('Cannot update a published test.');
  }
  const updatedEntity = await strapi.entityService.update(
    'api::test.test',
    entity.id,
    { data }
  );
  return toEntityResponse(updatedEntity);
};
