/**
 * candidate controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::candidate.candidate',
  ({ strapi }) => ({
    // Method 2: Wrapping a core action (leaves core logic in place)
    async create(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query, local: 'en' };
      console.log('===reach', ctx);

      // Calling the default core action
      const { data, meta } = await super.create(ctx);

      // some more custom logic
      meta.date = Date.now();

      return { data, meta };
    },
  })
);
