import { useMutation } from "@apollo/client";
import ADD_USER from "../gql/mutate/createAccount";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateAccount() {

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const [addUser, { data, loading, error }] = useMutation(ADD_USER);

    console.log('data:', data)
    console.log('error:', error)
    console.log('loading:', loading)

    const handleAccount = async (e) => {
        e.preventDefault()

        try {
            await addUser({
                variables: {
                    "user": {
                        "name": userData.name,
                        "username": userData.username,
                        "email": userData.email,
                        "password": userData.password
                    }
                }
            });
            toast.success("Account created!")
    
            setUserData({
                email: "",
                name: "",
                username: "",
                password: ""
            })
            console.log('userData:', userData)
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="text-center">Create Account</h1>
                        <form onSubmit={handleAccount}>
                            <input
                                className="form-control mt-2"
                                placeholder="Enter name"
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            />
                            <input
                                className="form-control mt-2"
                                placeholder="Enter username"
                                type="text"
                                value={userData.username}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                            <input
                                className="form-control mt-2"
                                placeholder="Enter email"
                                type="email"
                                value={userData.email}

                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                            <input
                                className="form-control mt-2"
                                placeholder="Enter password"
                                value={userData.password}
                                type="password"
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            />
                            <button type="submit" className="btn btn-success mt-2">
                                {loading ? "Submitting..." : "Create Account"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;