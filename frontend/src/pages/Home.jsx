import { useContext } from "react"
import Cards from "../component/Cards"
import { userAuthContextAPI } from "../context/UserAuthContext"

function Home() {
    const { userAuthData } = useContext(userAuthContextAPI)

    return (
        <div className="container">
            <h1 className="text-center mt-5">Welcome {userAuthData?.verifyUser?.name} 👍</h1>

            <div className="row mt-5">
                <div className="col-sm-4">
                    <Cards />
                </div>
                <div className="col-sm-4">
                    <Cards />
                </div>
                <div className="col-sm-4">
                    <Cards />
                </div>
            </div>
        </div>
    )
}

export default Home