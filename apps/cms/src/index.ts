import { Strapi } from '@strapi/strapi';
import { login, registerAuth } from './customize/graphql/mutation/auth';
import { updateTest } from './customize/graphql/mutation/updateTest';
import { responseCollectionMetaExtension } from './customize/graphql/query/responseCollectionMetaExtension';
import { testExtension } from './customize/graphql/query/test';
import { typeDefs } from './customize/graphql/typeDefs';
import { basicTest } from './customize/graphql/query/basicTest';

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
  register({ strapi }: { strapi: Strapi }) {
    const extensionService = strapi.service('plugin::graphql.extension');
    extensionService.use(() => ({
      typeDefs: typeDefs,
      resolvers: {
        Mutation: {
          register: {
            resolve: registerAuth,
          },
          login: {
            resolve: login,
          },
          updateTest: {
            resolve: updateTest,
          },
        },
        Query: {
          basicTest: {
            resolve: basicTest,
          }
        }
      },
      resolversConfig: {
        "Query.basicTest": {
          auth: false,
        },
      },
    }));

    extensionService.use(testExtension);
    extensionService.use(responseCollectionMetaExtension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  bootstrap(/*{ strapi }*/) {},
};
