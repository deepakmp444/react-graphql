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

// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/Login'));
// const CreateAccount = lazy(() => import('./pages/CreateAccount'));
// const CreateTweet = lazy(() => import('./pages/CreateTweet'));

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/tweet" element={<CreateTweet />} />
      </Routes>
    </>
  )
}

export default App
