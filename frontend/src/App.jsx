// import { lazy } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import NavBar from './component/NavBar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import CreateTweet from "./pages/CreateTweet";
import ProtectedRoute from "./component/ProtectedRoute";
import AllTweetByUser from "./pages/AllTweetByUser";
import { Toaster } from 'react-hot-toast';
import User from "./pages/User";
import PageNotFound from "./component/PageNotFound";

// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/Login'));
// const CreateAccount = lazy(() => import('./pages/CreateAccount'));
// const CreateTweet = lazy(() => import('./pages/CreateTweet'));

function App() {

  return (
    <>
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":email" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/tweets" element={<ProtectedRoute><AllTweetByUser /></ProtectedRoute>} />
        <Route path="/tweet" element={<ProtectedRoute><CreateTweet /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App

