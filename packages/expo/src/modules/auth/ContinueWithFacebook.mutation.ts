import {graphql} from '@animavita/relay';

export const ContinueWithFacebookMutation = graphql`
  mutation ContinueWithFacebookMutation($input: SaveFacebookUserInput!) {
    authenticateFacebookUser(input: $input) {
      error
      user {
        name
      }
      token
    }
  }
`;
