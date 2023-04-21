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

    type Mutation {
        login(input: UsersLoginInputCustom!): UsersPermissionsLoginPayload!
    }
    input UsersLoginInputCustom {
        email: String!,
        password: String!,
        provider: String!
    }
`;
