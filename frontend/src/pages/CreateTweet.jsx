import { useContext, useState } from "react";
import CREATE_TWEET from "../gql/mutate/createTweet";
import { useMutation } from "@apollo/client";
import { userAuthContextAPI } from "../context/UserAuthContext";
import toast from "react-hot-toast";

function CreateTweet() {
    const { userAuthData } = useContext(userAuthContextAPI)

    const [tweet, setTweet] = useState({
        title: "",
        imgUrl: "",
        description: "",
        userId: userAuthData?.verifyUser?._id
    })


    const [addTweet,] = useMutation(CREATE_TWEET);
  
    const handleTweet = async (e) => {
        try {
            e.preventDefault();
            await addTweet({
                variables: {
                    "tweet": {
                        "title": tweet.title,
                        "imgUrl": tweet.imgUrl,
                        "description": tweet.description,
                        "userId": tweet.userId
                    }
                }
            })

            toast.success("Tweet created")
            
            setTweet({
                title: "",
                imgUrl: "",
                description: "",
                userId: userAuthData?.verifyUser?._id
            })

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-4 offset-sm-4">
                    <h1 className="text-center">Create tweets</h1>
                    <form onSubmit={handleTweet}>
                        <input
                            className="form-control mt-2"
                            placeholder="Enter title"
                            type="text"
                            value={tweet.title}
                            onChange={(e) => setTweet({ ...tweet, title: e.target.value })}
                        />
                        <input
                            className="form-control mt-2"
                            placeholder="Enter img url"
                            type="text"
                            value={tweet.imgUrl}
                            onChange={(e) => setTweet({ ...tweet, imgUrl: e.target.value })}
                        />
                        <div className="form-floating mt-2">
                            <textarea className="form-control" placeholder="Leave a tweet descriptins here" id="floatingTextarea2" style={{ height: "100px" }}
                                value={tweet.description}
                                onChange={(e) => setTweet({ ...tweet, description: e.target.value })}
                            ></textarea>
                            <label htmlFor="floatingTextarea2">Tweet</label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Create tweet
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTweet;