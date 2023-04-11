import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  schema: process.env.GRAPHQL_API_URL || 'http://localhost:1337/graphql',
  documents: './src/operations/**/*.graphql',
  generates: {
    './src/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  // https://github.com/dotansimha/graphql-code-generator/issues/9046
  // ( command -v grep   grep -rl  \"graphql-request/dist/types\" src/graphql | xargs sed -i '' 's|graphql-request/dist/types|graphql-request/src/types|g'  || powershell -Command \"(gc ./src/generated.ts) -replace 'graphql-request/dist/types.dom', 'graphql-request/src/types.dom' | Out-File -encoding ASCII ./src/generated.ts\")
};

export default config;
