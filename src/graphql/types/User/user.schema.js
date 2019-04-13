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

  # User related mutations
  type Mutation {
    # Create user using input, returning user created
    createUser(data: UserCreateInput!): User!
  }

`;
