import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const TweetSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide title"],
        maxLength: [40, "Name should be under 20 character"],
    },
    imgUrl: {
        type: String,
        required: [true, "Please provide imgurl"],
    },
    description: {
        type: String,
        required: [true, "Please provide description"],
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User", require: [true, "You are not logged in"] }
});

export default model("Tweet", TweetSchema);
