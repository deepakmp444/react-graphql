export const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    tweets: [Tweet]
  }

  type Tweet {
    _id: ID!
    title: String!
    imgUrl: String!
    description: String!
    userId: ID!
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    verifyUser:User
    tweets: [Tweet]
    tweet(_id: ID!): Tweet
    tweetsByUser(userId: ID!): [Tweet]
    tweetByUser(userId: ID!): Tweet
  }

  type Mutation{
    addUser(user: AddUserInput): User
    login(email:String!, password:String!):User
    logout: String!
    updateUser(user: AddUserInput!, _id: ID!): User
    deleteUser(_id: ID!): User

    addTweet(tweet: AddTweetInput!): Tweet
    deleteTweet(_id: ID!): Tweet
    updateTweet(tweet: AddTweetInput!, userId: ID!): Tweet

  }

  input AddTweetInput{
    title: String!
    imgUrl: String!
    description: String!
    userId: ID!
  }

  input AddUserInput{
    name: String !
    email: String!
    password: String
  }

`;
