export const typeDefs = `
  type Game {
    _id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }

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

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
    users: [User]
    user(_id: ID!): User
    login(email:String!, password:String!):User
    verifyUser:User
    logout: String!
    tweets: [Tweet]
    tweet(_id: ID!): Tweet
    tweetsByUser(userId: ID!): [Tweet]
    tweetByUser(userId: ID!): Tweet

  }

  type Mutation{
    updateGame(edit:UpdateGameInput!, id:ID!): Game
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]

    addUser(user: AddUserInput): User
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

  input AddGameInput{
    title: String!
    platform: [String!]!
  }

  input UpdateGameInput{
    title: String
    platform: [String!]
  }

`;
