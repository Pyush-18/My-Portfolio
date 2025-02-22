import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsycnHandler.js";
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req, _ , next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decode?._id)
        if(!user){
            throw new ApiError(400, "Invalid token")
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        throw new ApiError(401, error?.message || "Internal server error")
    }
})