export default `
  type Token {
    token: String!
  }

  type Mutation {
    createToken(email: String!, password: String!): Token!
  }
`;
