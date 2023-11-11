import { gql } from '@apollo/client';

const CREATE_TWEET = gql`
mutation addTweet($tweet: AddTweetInput!){
 addTweet(tweet: $tweet) {
    _id
   title
   description
   userId
 } 
}
`;

export default CREATE_TWEET