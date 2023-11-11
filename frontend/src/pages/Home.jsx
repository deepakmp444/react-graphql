import { useContext } from "react"
import Cards from "../component/Cards"
import { userAuthContextAPI } from "../context/UserAuthContext"
import { useQuery } from "@apollo/client"
import ALL_TWEET from "../gql/query/allTweet"
import { Outlet, useParams } from "react-router-dom"

function Home() {
    let { userName } = useParams();
    const { userAuthData, } = useContext(userAuthContextAPI)
    const { data, loading, error } = useQuery(ALL_TWEET)
    console.log('data:', data?.tweets[0].title)
    console.log('data, loading, error:', data, loading, error)


    return (
        <div className="container">
            <h1 className="text-center mt-5">Welcome {userAuthData?.verifyUser?.name} 👍</h1>
            <div className="row mt-5">
                {userName ? <Outlet /> : <>{data?.tweets?.map((value, index) => {
                    return (
                        <div className="col-sm-4" key={index}>
                            <Cards value={value} />
                        </div>
                    )
                })}</>}
            </div>
        </div>
    )
}

export default Home