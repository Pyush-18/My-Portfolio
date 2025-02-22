import { Skill } from "../models/skill.model.js";
import { asyncHandler } from "../utils/AsycnHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

export const addSkill = asyncHandler(async(req, res) => {
    const {skill, level} = req.body
    if(!skill){
        throw new ApiError(400, "skill is required")
    }

    const newSkill = await Skill.create({skill: skill?.trim(), level})
    await newSkill.save()
    if(!newSkill){
        throw new ApiError(400, "Error while adding skill")
    }

    return res.status(200)
    .json(new ApiResponse(200, newSkill, "Skill added successfully"))

})

export const getSkill = asyncHandler(async(req, res) => {
    const skill = await Skill.find()
    if(!skill || skill.length === 0){
        throw new ApiError(400, "Skill not found")
    }

    return res.status(200)
    .json(new ApiResponse(200, skill, "Skill fetched succesfully"))
})

export const removeSkill = asyncHandler(async(req, res) => {
    const {skillId} = req.params
    if(!isValidObjectId(skillId)){
        throw new ApiError(400, "Invalid skill id")
    }

    const skill = await Skill.findByIdAndDelete(skillId)
    if(!skill){
        throw new ApiError(400, "Error while deleting the skill")
    }

    return res.status(200)
    .json(new ApiResponse(200, {}, "Skill deleted successfully"))
})