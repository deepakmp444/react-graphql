// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "./schema.js";

// import connectDB from "./db/index.js";
// import { resolvers } from './resolvers.js'


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const start = async () => {
//   try {
//     const { url } = await startStandaloneServer(server, {
//       listen: { port: 4000 },
//       context: async ({ req, res }) => {
//         // console.log('res:', res)
//         // Get the user token from the headers.
//         // const token = req.headers.authorization || '';

//         // Try to retrieve a user with the token
//         // const user = {
//         //   name: "Deepak",
//         //   clg: "SISTEC"
//         // }

//         // Add the user to the context
//         return { req, res };
//       },

//     });

//     console.log(`🚀  Server ready at: ${url}`);
//     await connectDB();
//     console.log("Connected to database");
//   } catch {
//     console.log("Not able to run GraphQL server");
//   }
// };

// start();


// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from "./schema.js";
import cookieParser from 'cookie-parser'
import connectDB from "./db/index.js";
import { resolvers } from './resolvers.js'

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cookieParser(),
  cors({ credentials: true, origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return { req, res }
    },
  }),
);

const start = async () => {
  await connectDB()
  console.log("Connected to database");
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}
start()

// Modified server startup

