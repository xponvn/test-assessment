export const typeDefs = `
    type Mutation {
        register(input: UsersPermissionsRegisterInputCustom!): UsersPermissionsLoginPayload!
    }
    input UsersPermissionsRegisterInputCustom {
        username: String!,
        password: String!,
        email: String!,
        confirmPassword: String!
    }
`;
