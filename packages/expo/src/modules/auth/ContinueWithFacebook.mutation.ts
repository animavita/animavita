import {graphql} from '@animavita/relay';

export const ContinueWithFacebookMutation = graphql`
  mutation ContinueWithFacebookMutation($input: AuthenticateFacebookUserInput!) {
    authenticateFacebookUser(input: $input) {
      error
      user {
        name
      }
      token
    }
  }
`;
