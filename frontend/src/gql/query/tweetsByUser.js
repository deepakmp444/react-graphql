import { gql } from '@apollo/client';

const TWEETS_BY_USER = gql`
query tweetsByUser($userId: ID!){
  tweetsByUser(userId: $userId) {
    _id
    title
    imgUrl
    description
  }
}
`;

export default TWEETS_BY_USER