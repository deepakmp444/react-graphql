import { useQuery } from "@apollo/client"
import TWEETS_BY_USER from "../gql/query/tweetsByUser"
import { userAuthContextAPI } from "../context/UserAuthContext"
import { useContext } from "react"

function AllTweetByUser() {
    const { userAuthData } = useContext(userAuthContextAPI)

    const { data, error, loading } = useQuery(TWEETS_BY_USER, {
        variables: {
            "userId": userAuthData?.verifyUser?._id
        }
    })
    console.log('data:', data?.tweetsByUser)

    if (loading) return <h1 className="text-center">Loading...</h1>
    if (error) return <h1 className="text-center">{error.message}</h1>

    return (
        <div className="container mt-5">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Img</th>
                        <th scope="col">Descriptin</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.tweetsByUser?.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.title}</td>
                                <td><img src={value.imgUrl} alt="Loading..." height={100} width={100}/></td>
                                <td>{value.description}</td>
                                <td><button className="btn btn-warning">Update</button></td>
                                <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default AllTweetByUser