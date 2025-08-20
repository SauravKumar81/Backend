import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req , res) => {
    //get user detail from frontend
    //validation - not empty 
    //check if user already exists: username, email
    //check for images, checck for avtar 
    //upload them to cloudinary , avtar 
    //create user object - create enter in db 
    // remover password and refresh token field form response 
    ///check for user creation 
    // return res.
    const { email, fullName, username,password} = req.body

    // if(fullName === "") {
    //     throw new ApiError(400, "Full name is required");
    // }

    if ([fullName, email, username, password].some((field)=>field?.trim()==="")) 
        {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or:[{email},{username}]
    })

    if (existedUser){
        throw new ApiError(400, "User already exists");
    }

     const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Both avatar ");
    }
    // if (!coverImageLocalPath) {
    //     throw new ApiError(400, "cover image are required");
    // }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar || !coverImage) {
        throw new ApiError(500, "Failed to upload images");
    }
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()         

    })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken");


    if (!coverImage) {
        throw new ApiError(500, "Something went wrong while registering user");
    }


    return res.status(201).json(
        new ApiResponse(200, "User registered successfully", createdUser)
    );
})



export { registerUser };