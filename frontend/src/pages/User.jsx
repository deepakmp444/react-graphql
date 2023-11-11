import { useQuery } from "@apollo/client"
import All_Tweets_By_User from "../gql/query/allTweetsByUser"
import Cards from "../component/Cards"

function User() {
    const userNameByUrl = window.location.pathname.substring(1)
    const { data, error, loading } = useQuery(All_Tweets_By_User, {
        variables: {
            "username": userNameByUrl
        }
    })

    console.table('data userNameByUrl:', data?.user)
    return (
        <div className="container">
        <h1 className="text-center mt-5"> <span className="text-muted">Username :</span> {data?.user?.username}</h1>
            <div className="row">
            {data?.user?.tweets?.map((value, index) => {
                    return (
                        <div className="col-sm-4" key={index}>
                            <Cards value={value} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default User