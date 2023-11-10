import { GameSchema } from "./db/models/index.js";
import userModel from "./db/models/userModel.js";
import db from './_db.js';
import tweetModel from "./db/models/tweetModel.js";
import jwt from "jsonwebtoken"
export const resolvers = {
  Query: {
    // mongoDB
    users: async () => await userModel.find(),
    user: async (_, args, context, info) => {
      // console.log('context:', context)
      // console.log('info:', info)
      // console.log('context:', context)

      return await userModel.findById({ _id: args._id })
    },

    login: async (_, args, context) => {
      const user = await userModel.findOne({ email: args.email })
      if (args.password === user.password) {
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          secure: true,
          httpOnly: true,
          sameSite: "none",
          path: "/",
        };
        const userToken = {
          email: user.email,
          _id: user._id,
          name: user.name
        }
        const gqltolem = jwt.sign(userToken, "12121212", { expiresIn: "1d" })
        context.res.cookie("gqltoken", gqltolem, options)

        return user
      } else {
        throw new Error("Password does not matched")
      }
    },

    verifyUser: async (_, args, context) => {
      console.log('args:', args)
      const token = context.req.cookies["gqltoken"]
      if (token) {
        // console.log('verifyUser token:', token)
        const data = jwt.verify(token, "12121212")
        console.log('data:', data)
        // return token
        return await userModel.findById({ _id: data._id })
      } else {
        throw new Error(null)
      }
    },

    logout: async (_, args, context) => {
      context.res.clearCookie("gqltoken", { sameSite: "none", secure: true })
      return "Logout successfully"
    },

    tweets: async () => await tweetModel.find(),
    tweet: async (_, args) => {
      return await tweetModel.findOne({ _id: args._id })
    },

    tweetByUser: async (_, args) => {
      return await tweetModel.findOne({ userId: args.userId })
    },

    tweetsByUser: async (_, args) => {
      return await tweetModel.find({ userId: args.userId })
    },


    games: async () => await GameSchema.find(),

    // Static Data
    authors: () => db.authors,
    reviews: () => db.reviews,
    review: (_, args) => db.reviews.find((review) => review.id === args.id),
    game: (_, args) => db.games.find((game) => game.id === args.id),
    author: (_, args) => db.authors.find((author) => author.id === args.id),
  },

  Game: {
    reviews: (parent, args) => {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },

  User: {
    tweets: async (parent, args) => {
      const data = await tweetModel.find({ userId: parent._id })
      return data
    }
  },

  Review: {
    game: (parent) => {
      console.log("game parent:", parent);
      return db.games.find((g) => g.id === parent.game_id);
    },
    author: (parent) => {
      console.log("author parent:", parent);
      return db.authors.find((a) => a.id === parent.author_id);
    },
  },
  Mutation: {
    deleteGame: (_, arg) => {
      db.games = db.games.filter((g) => g.id !== arg.id);
      return db.games;
    },
    addGame: async (_, { game }) => {
      console.log('game:', game.platform)
      const data = await GameSchema.create({
        title: game.title,
        platform: game.platform,
      });
      return data;
    },

    addUser: async (parent, { user }) => {
      console.log('user:', user)
      const data = await userModel.create({
        name: user.name,
        email: user.email,
        password: user.password
      });
      return data;
    },

    addTweet: async (parent, { tweet }) => {
      const data = await tweetModel.create({
        title: tweet.title,
        imgUrl: tweet.imgUrl,
        description: tweet.description,
        userId: tweet.userId
      });
      return data;
    },

    updateTweet: async (parent, { tweet, userId }) => {
      const data = await tweetModel.findOneAndUpdate({
        userId
      }, tweet);
      return data;
    },

    deleteTweet: async (parent, { _id }) => {
      const data = await tweetModel.findByIdAndDelete(_id)
      if (!data) {
        throw new Error("Not Found Tweet")
      } else {
        return data
      }
    },

    updateUser: async (parent, { user, _id }) => {
      console.log('updateUser:', user)
      const data = await userModel.findByIdAndUpdate({
        _id
      }, user);
      return data;
    },

    deleteUser: async (parent, { _id }) => {
      const data = await userModel.findByIdAndDelete(_id)
      if (!data) {
        throw new Error("Not Found Users")
      } else {
        return data
      }
    },

    updateGame: (_, args) => {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edit };
        }
        return g;
      });

      return db.games.find((g) => g.id === args.id);
    },
  },
};