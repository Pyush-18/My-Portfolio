import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String, //cloudinary,
  githubUrl : String,
  previewUrl : String,
  secureUrl: String,
  publicId: String  //cloudinary
},{timestamps: true})

export const Project = mongoose.model("Project", projectSchema)