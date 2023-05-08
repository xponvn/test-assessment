export const typeDefs = `
    type Mutation {
        register(input: UsersPermissionsRegisterInputCustom!): UsersPermissionsLoginPayload!
        login(input: UsersLoginInputCustom!): UsersPermissionsLoginPayload!
        updateTest(id: ID!, data: TestInput!): TestEntityResponse
        deleteTest(id: ID!): TestEntityResponse
    }

    input UsersPermissionsRegisterInputCustom {
        username: String!,
        password: String!,
        email: String!,
        confirmPassword: String!
    }

    input UsersLoginInputCustom {
        email: String!,
        password: String!,
        provider: String!
    }
`;
