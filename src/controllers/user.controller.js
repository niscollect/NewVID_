import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js"

import { User } from "../models/user.model.js";

import { upload } from "../middlewares/multer.middleware.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

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
    console.log("email", email);
    
    //s2:-Validation
    // if(fullName === "")
    // {
    //     throw new ApiError(400, );
    // }
    if(
        [fullName, email, username, password].some((field)=> field?.trim() === "" )
    )
    {
        throw new ApiError(400, "All fields are required");
    }


    //s3:- checking for existence of user already
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedUser)
    {
        throw new ApiError(409, "User with this email or username aleready exists");
    }


    //s4:- Check for images/avatar 
      //s4.1:- get the local file path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    
    // let coverImageLocalPath;
    // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 )
    // {
    //     coverImageLocalPath = req.files.coverImage[0].path;        
    // }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }
      //s4.2:- upload on cloudinary
    // await uploadOnCloudinary(avatarLocalPath);   why await becoz it will surely take time, and that's the exact rzn why we have this function(in which we are right now) is async
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar field is required");
    }

    //s5:- create object create an entry in DB
    const user = await User.create({  //"await" coz interaction with db may cause error so be assured with async-await(just did) and try-catch(well we have asyncHandler for that)
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })
    //s6:- check if user is craeted also or not
    const createdUser = await User.findById(user._id)?.select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    //s7:- return response if the user is successfully created
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})


export {registerUser};