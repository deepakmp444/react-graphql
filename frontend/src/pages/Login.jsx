import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import USER_LOGIN from "../gql/mutate/loginUser";
import { useMutation } from "@apollo/client";
import { userAuthContextAPI } from "../context/UserAuthContext";
import toast from "react-hot-toast";

function Login() {
  const { setUserAuthData, setIsLoggedIn } = useContext(userAuthContextAPI)

  const [login] = useMutation(USER_LOGIN);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const {data : userDataLoggedIn} =  await login({
        variables: {
          "email": loginData.email,
          "password": loginData.password
        }
      });
      setUserAuthData({
        verifyUser:{
          email : userDataLoggedIn.login.email,
          name: userDataLoggedIn.login.name,
          _id: userDataLoggedIn.login._id
        }
      })
      setIsLoggedIn(true)
      toast.success("Login Successfull!")
      setLoginData({
        email: "",
        password: ""
      })
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4 offset-sm-4">
          <h1 className="text-center">Login</h1>
          <form onSubmit={loginUser}>
            <input
              className="form-control mt-2"
              placeholder="Enter email"
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              className="form-control mt-2"
              placeholder="Enter password"
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;