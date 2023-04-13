export default {
  // Step 1: Configure the redis connection
  // @see https://github.com/strapi-community/strapi-plugin-redis
  redis: {
    config: {
      connections: {
        default: {
          connection: {
            host: 'localhost',
            port: 6379,
            db: 0,
          },
          settings: {
            debug: false,
          },
        },
      },
    },
  },
  // Step 2: Configure the redis cache plugin
  'rest-cache': {
    config: {
      provider: {
        name: 'redis',
        options: {
          max: 32767,
          connection: 'default',
        },
      },
      strategy: {
        enableEtagSupport: true,
        logs: true,
        clearRelatedCache: true,
        maxAge: 3600000,
        contentTypes: [],
      },
    },
  },
  email: {
    config: {
      provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      settings: {
        defaultFrom: 'dinhthanhtrung7051992@gmail.com',
        defaultReplyTo: 'dinhthanhtrung7051992@gmail.com',
        testAddress: 'trungdt70519921@gmail.com',
      },
    },
  },

  //  Configure graphql plugin
  graphql: {
    enable: true,
    config: {
      playgroundAlways: true,
      apolloServer: {
        introspection: true,
      },
    },
  },
};
