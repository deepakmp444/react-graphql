// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {
  BrowserRouter,
} from "react-router-dom";
import UserAuthProvider from './context/UserAuthContext.jsx';

const link = createHttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <ApolloProvider client={client}>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </ApolloProvider>
  </BrowserRouter>

)
