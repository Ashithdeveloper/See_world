import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId :{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default:""
    },
    bannerUrl: {
        type: String,
        default:""  
    },
    bio: {
        type: String,
        default:"",
        maxLength: 160
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
  
},

{
    timestamps: true
}
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;