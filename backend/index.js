import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games: () => db.games,
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
    addGame: (_, arg) => {
      let game = {
        ...arg.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  typeDefs,
  resolvers,
});



const start = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

start();
