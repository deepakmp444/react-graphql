import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxLength: [20, "Name should be under 20 character"],
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
