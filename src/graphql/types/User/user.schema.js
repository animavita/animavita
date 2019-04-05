export default `
  input UserCreateInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    _id: String!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    login: User!
    createUser(input: UserCreateInput!): User
  }

`;
