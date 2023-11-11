import { gql } from '@apollo/client';

const All_Tweets_By_User = gql`
query user($username: String!){
  user(username: $username) {
    email
    name
    username
    tweets {
      title
      imgUrl
      description
    }
  }
}
`;

export default All_Tweets_By_User