import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTweet() {

    const navigate = useNavigate()


    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-4 offset-sm-4">
                    <h1 className="text-center">Create tweets</h1>
                    <form>
                        <input
                            className="form-control mt-2"
                            placeholder="Enter title"
                            type="text"
                        />
                        <input
                            className="form-control mt-2"
                            placeholder="Enter img url"
                            type="text"
                        />
                        <div className="form-floating mt-2">
                            <textarea className="form-control" placeholder="Leave a tweet descriptins here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                            <label htmlFor="floatingTextarea2">Tweet</label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTweet;