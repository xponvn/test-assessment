import { typeDefs } from './customize/graphql/typeDefs';
import { registerAuth } from './customize/graphql/mutation/auth';

/**
 * Throws an ApolloError if context body contains a bad request
 * @param contextBody - body of the context object given to the resolver
 * @throws ApolloError if the body is a bad request
 */

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service('plugin::graphql.extension');
    extensionService.use(({ strapi }) => ({
      typeDefs: typeDefs,
      resolvers: {
        Mutation: {
          register: {
            resolve: registerAuth,
          },
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
