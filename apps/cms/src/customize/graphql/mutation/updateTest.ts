export const updateTest = async (parent, args, context) => {
  // TODO:
  // step 1: Check the test is publish or draft
  // if publish -> return error
  // if not -> update test
  const { id } = args;
  // @ts-expect-error due to no typing
  const { toEntityResponse } = strapi.service(
    'plugin::graphql.format'
  ).returnTypes;
  const data = await strapi.db.query('api::test.test').findOne({
    where: { $and: [{ id }, { publishedAt: { $notNull: true } }] },
  });
  if (!data) {
    throw new Error('Cannot find any published test.');
  }
  console.log(data);
  return toEntityResponse(data);
};
