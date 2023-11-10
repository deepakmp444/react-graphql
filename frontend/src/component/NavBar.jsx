import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

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
                        </ul>
                        <div className="d-flex" role="search">
                            <button
                                className="btn btn-success me-2"
                                onClick={() => navigate("/tweet")}
                                type="submit"
                            >
                                Create Tweet
                            </button>

                            <button
                                className="btn btn-success me-2"
                                onClick={() => navigate("/create-account")}
                                type="submit"
                            >
                                Create account
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/login")}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;