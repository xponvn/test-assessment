export const testExtension = ({ nexus }) => ({
  types: [
    // creating new object type called Creator
    nexus.objectType({
      type: 'Author',
      name: 'Author',
      definition(t) {
        t.int('id');
        t.string('firstName');
        t.string('lastName');
        t.string('email');
      },
    }),
    nexus.extendType({
      type: 'Test',
      definition(t) {
        // we want to know who is the creator
        t.field('author', {
          type: 'Author',
          async resolve(root, args, ctx) {
            // when we use query, we can populate createdBy
            const query = strapi.db.query('api::test.test');
            const test = await query.findOne({
              where: {
                id: root.id,
              },
              populate: ['createdBy'],
            });

            return {
              id: test.createdBy.id,
              firstName: test.createdBy.firstname,
              lastName: test.createdBy.lastname,
              email: test.createdBy.email,
            };
          },
        });
      },
    }),
  ],
});
