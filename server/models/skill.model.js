import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    level:{
        type: Number
    }
},{timestamps: true})

export const Skill = mongoose.model("Skill", skillSchema)