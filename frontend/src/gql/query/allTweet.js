import { gql } from '@apollo/client'

const ALL_TWEET = gql`
query tweets{
  tweets {
    title
    imgUrl
    description
    user {
      email
      name
      username
    }
  }
}
`;

export default ALL_TWEET;