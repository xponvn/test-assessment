export const createCandidate = async (args, strapi) => {
  // args:
  // {
  //   data: [Object: null prototype] {
  //     firstName: 'first',
  //     lastName: 'last',
  //     email: 'foobar@eg.com',
  //     phone: '',
  //     position: 'dev',
  //     level: 'junior'
  //   }
  // }
  console.log(args, strapi);
  const { email } = args.data;
  const { toEntityResponse } = strapi.service(
    'plugin::graphql.format'
  ).returnTypes;
  const entity = await strapi.entityService.findOne({
    where: { $and: [{ email }, { publishedAt: { $null: true } }] },
  });

  if (entity) throw new Error(`Candidate ${email} is already existed!`);

  await strapi.transaction;
  // if (!entity) {
  //   throw new Error('Cannot update a published test.');
  // }
  // const updatedEntity = await strapi.entityService.update(
  //   'api::test.test',
  //   entity.id,
  //   { data }
  // );
  return toEntityResponse(entity);
};
