export default `
  type Token {
    user: User!
    token: String!
  }

  type Mutation {
    createToken(email: String!, password: String!): Token!
  }
`;
