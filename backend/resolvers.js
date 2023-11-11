import userModel from "./db/models/userModel.js";
import tweetModel from "./db/models/tweetModel.js";
import jwt from "jsonwebtoken"

export const resolvers = {
  Query: {
    users: async () => await userModel.find(),

    user: async (_, args, context, info) => {
      return await userModel.findOne({ username: args.username })
    },

    verifyUser: async (_, args, context) => {
      console.log('args:', args)
      const token = context.req.cookies["gqltoken"]
      if (token) {
        const data = jwt.verify(token, "12121212")
        return await userModel.findById({ _id: data._id })
      } else {
        throw new Error(null)
      }
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
  },

  User: {
    tweets: async (parent, args) => {
      console.log('tweets parent:', parent)
      const data = await tweetModel.find({ userId: parent._id })
      return data
    }
  },

  Tweet: {
    user: async (parent, args) => {
      console.log('parent:', parent)
      const data = await userModel.findById({ _id: parent.userId })
      return data
    }
  },

  Mutation: {
    login: async (_, args, context) => {
      const user = await userModel.findOne({ email: args.email })
      if(user){
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
      }else{
        throw new Error("User not found")
      }
      
    },

    logout: async (_, args, context) => {
      context.res.clearCookie("gqltoken", { sameSite: "none", secure: true })
      return "Logout successfully"
    },

    addUser: async (parent, { user }) => {
      const data = await userModel.create({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      });
      return data;
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
  },
};