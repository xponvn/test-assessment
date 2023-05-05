export const responseCollectionMetaExtension = ({ nexus }) => ({
  types: [
    nexus.objectType({
      name: 'CountByStatus',
      definition(t) {
        t.int('published');
        t.int('draft');
      },
    }),

    nexus.extendType({
      type: 'ResponseCollectionMeta',
      definition(t) {
        // we want to know who is the creator
        t.field('countByStatus', {
          type: 'CountByStatus',
          async resolve(root) {
            const publishedFilters = root.args.filters || {};
            if (publishedFilters.publishedAt) {
              publishedFilters.publishedAt.$notNull = true;
            } else {
              publishedFilters.publishedAt = {
                $notNull: true,
              };
            }

            const published = await strapi.query(root.resourceUID).count({
              where: publishedFilters,
            });

            let draft = 0;
            if (root.args.publicationState === 'preview') {
              const draftFilters = root.args.filters || {};
              if (draftFilters.publishedAt) {
                draftFilters.publishedAt.$notNull = false;
              } else {
                draftFilters.publishedAt = {
                  $notNull: false,
                };
              }

              draft = await strapi.query(root.resourceUID).count({
                where: draftFilters,
              });
            }

            return {
              published,
              draft,
            };
          },
        });
      },
    }),
  ],
});