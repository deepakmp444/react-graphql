import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthContextAPI } from "../context/UserAuthContext";
import { useMutation } from "@apollo/client";
import USER_LOGOUT from "../gql/mutate/logoutUser";

function NavBar() {
    const navigate = useNavigate();
    const { userAuthData, setUserAuthData ,  isLoggedIn, setIsLoggedIn } = useContext(userAuthContextAPI)
    const [logout] = useMutation(USER_LOGOUT);
    const logoutUser = async () => {
        try {
            await logout()
            setIsLoggedIn(false)
            setUserAuthData({})
            navigate("/")
        } catch (error) {
            console.log('error:', error)
            navigate("/")
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Store
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    onClick={() => navigate("/")}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                {userAuthData?.verifyUser?.email}
                            </li>

                        </ul>
                        <div className="d-flex" role="search">
                            { isLoggedIn && <button
                                className="btn btn-success me-2"
                                onClick={() => navigate("/tweet")}
                                type="submit"
                            >
                                Create Tweet
                            </button>}
                            { isLoggedIn && <button
                                className="btn btn-outline-success me-2"
                                onClick={() => navigate("/tweet")}
                                type="submit"
                            >
                                All tweet
                            </button>}

                            { !isLoggedIn && <button
                                className="btn btn-success me-2"
                                onClick={() => navigate("/create-account")}
                                type="submit"
                            >
                                Create account
                            </button>}

                            { !isLoggedIn && <button
                                className="btn btn-primary"
                                onClick={() => navigate("/login")}
                                type="submit"
                            >
                                Login
                            </button>}

                            { isLoggedIn && <button
                                className="btn btn-primary ms-2"
                                onClick={logoutUser}
                                type="submit"
                            >
                                Logout
                            </button>}


                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;