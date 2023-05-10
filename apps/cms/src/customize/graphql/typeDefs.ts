export const typeDefs = `
    type Mutation {
        register(input: UsersPermissionsRegisterInputCustom!): UsersPermissionsLoginPayload!
        login(input: UsersLoginInputCustom!): UsersPermissionsLoginPayload!
        updateTest(id: ID!, data: TestInput!): TestEntityResponse
    }

    type Query {
      basicTest(id: ID!): BasicTestEntityResponse
    }

    type BasicTest {
      name: String!
      position: PositionEntityResponse
      level: ENUM_TEST_LEVEL
      timeLimit: Int!
      numberOfQuestions: Int!
      questionTypes: [String!]!
    }

    type BasicTestEntity {
      id: ID
      attributes: BasicTest
    }

    type BasicTestEntityResponse {
      data: BasicTestEntity
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
