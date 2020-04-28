export const createApolloStore = USER_LOGIN_MUTATION => [
  {
    request: {
      query: USER_LOGIN_MUTATION,
      variables: { accessToken: '' }
    },
    result: {
      data: {
        SignInWithFacebookMutation: {
          user: {
            _id: 1,
            name: '',
            lastname: '',
            avatar: '',
            email: '',
            hero: '',
            notifications: '',
            address: {
              state: '',
              city: ''
            }
          },
          token: ''
        }
      }
    }
  }
];
