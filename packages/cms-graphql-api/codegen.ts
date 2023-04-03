import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  schema: process.env.GRAPHQL_API_URL || "http://localhost:1337/graphql",
  documents: "./src/operations/**/*.graphql",
  generates: {
    "./src/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
