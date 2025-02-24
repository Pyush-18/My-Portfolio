import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsycnHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { sendMessage } from "../utils/mailer.js";


export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    if([name, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(400, "User with this email already exists")
    }

    const newUser = await User.create({
        name : process.env.USER_NAME, 
        email : process.env.USER_EMAIL, 
        password : process.env.USER_PASSWORD
    })
    await newUser.save()
    if(!newUser){
        throw new ApiError(400, "Error while registration")
    }


    return res.status(200)
    .json(
        new ApiResponse(200, newUser, "User registered successfully")
    )
})

export const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Internal server error")
    }
}

export const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new ApiError(400, "Field is missing")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400, "User doesn't exists")
    }

    const isPasswordMatched = await user.isPasswordCorrect(password)
    if(!isPasswordMatched){
        throw new ApiError(400, "Invalid password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user?._id)
    const options = {
        httpOnly : true, 
        secure: true
    }

    const loggedInUser = await User.findById(user?._id).select("-password")

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, loggedInUser, "User login successfully")
    )
})

export const logoutUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly : true, 
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logout successfully")
    )

})


export const getAuthUser = asyncHandler(async(req , res) => {
    const user = await User.findById(req.user?._id).select("-password -email")
    if(!user){
        throw new ApiError(400, "User not found")
    }

    return res.status(200)
    .json(
        new ApiResponse(200, user, "User fetched successfully")
    )
})

export const contactMe = asyncHandler(async(req, res) => {
    const {name, email, message} = req.body
    const sendMsg = await sendMessage({name, email, message})
    if(!sendMsg){
        throw new ApiError(400, "Error while sending the message")
    }

    return res.status(200)
    .json(new ApiResponse(200, sendMsg, "Message send successfully"))
})






