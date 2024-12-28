import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async(req, res)=>{
    // res.status(200).json({
    //     message: "ok"
    // })
    
    // get user's deatils from front end
    // validation -> not empty(atleast)
    // check if already exits: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user obejct - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // s1:-get user's details     //details are found in request, and since coming from the front-end, it's in the body of the HTTP request
    const {username, password,fullName, email} = req.body
    console.log("email", email)
})


export {registerUser};