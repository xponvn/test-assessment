export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env('DATABASE_PORT', '5432'),
      database: env('DATABASE_NAME', 'test-assessment'),
      user: env('DATABASE_USERNAME', 'test-assessment'),
      password: env('DATABASE_PASSWORD', 'test-assessment'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
