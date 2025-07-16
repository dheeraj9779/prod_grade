import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async(req,res) => {
    const {fullName, username, email, password} = req.body
    
    if([fullName,username,email,password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All Fields are required")
    }

    //check from both the fields
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    let converImageLocalPath = ""
    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    let coverImage = null
    if(res.files && Array.isArray(req.files?.coverImage) && req.files?.coverImage.length){
        converImageLocalPath = req.files?.coverImage[0]?.path;
        coverImage = await uploadOnCloudinary(converImageLocalPath)
    }


    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) // remove some fields if not want

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if(email?.trim() === "" || password?.trim() === ""){
        throw new ApiError(400,"Email and password are required")
    }

    const userExist = await User.findOne({email})

    const passwordMatched = await userExist.isPasswordCorrect(password);

    if(!passwordMatched){
        throw new ApiError(400,"Invalid email or password")
    }

    return res.status(201).json(
        new ApiResponse(200, userExist, "User LoggedIn Successfully")
    )

})

export { registerUser, loginUser }