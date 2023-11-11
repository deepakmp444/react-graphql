import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxLength: [20, "Name should be under 20 character"],
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxLength: [20, "Username should be under 20 character"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    }
});
export default model("User", UserSchema);
