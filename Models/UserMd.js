import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String, required: [true, "username is required"], unique: [true, "username must be unique"],
    }, password: {
        type: String, required: [true, "password is required"],

    }, role: {
        type: String, enum: ["admin", "user"], default: "user"
    }
}, {timestamps: true})


const User = mongoose.model("User", userSchema);
export default User;