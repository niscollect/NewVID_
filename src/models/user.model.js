import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema({})
// We can also do:-
// import mongoose, {Schema} from "mongoose"
// const userSchema = new Schema({})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,   // Whenever we want to enable searching for a field, we set "index:true" for it
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,  //Cloudinary url
        required: true,
    },
    coverImage:{
        type: String,  //Cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken:{
        type: String,
    }
},
{
    timestamps:true,
})


//Password Encryption
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) { return next()}
    this.password = bcrypt.hash(this.password, 10);
    next();
})  // basically we the password to be hashed only when it is modified, otherwise if we don't control it using the if statement, the password will be hashed everytime the user changes and saves anything, and the password would then change all the time

userSchema.methods.generateAccessToken = async function(){
    await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        // process.env.ACCESS_TOKEN_SECRET,  //we must be giving this access token secret from environment variables only
        "J8njsg7aaYU-uGHFAIagfysy9twvv22-66dfgsASDhs-uGHFSYWUsahgY15akhhs628njsg7aaYUT26",
        {
            // expiresIn: process.env.ACCESS_TOKEN_EXPIRY  //we must be giving this access token secret from environment variables only
            expiresIn: "1d",
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    await jwt.sign(
        {
            _id: this._id,
        },
        // process.env.REFRESH_TOKEN_SECRET,  //we must be giving this access token secret from environment variables only
        "2njsg7aaYU-uGHFSYWUsahgY15akhhs628njsg22-66dfgsaYUT26T26-v22-66dfgsASDhs-uG8387JAIagfysy9twvv",
        {
            // expiresIn: process.env.REFRESH_TOKEN_EXPIRY  //we must be giving this access token secret from environment variables only
            expiresIn: "10d",
        }
    )
}

userSchema.methods.isPasswordCorrect = async function(password){
    //bcryt library not just helps in encryption of the password, but also its checking
    return await bcrypt.compare(password, this.password)  //this is a boolean return
}


export const User = mongoose.model("User", userSchema);
