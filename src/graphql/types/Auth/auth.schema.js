export default `
  type Token {
    token: String!
  }


  type Mutation {
    login(email: String!, password: String!): Token!
    # Create user using input, returning user created and token generated
    register(data: UserCreateInput!): Token!

  }
`;
