import { asyncHandler } from "../utils/AsycnHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { isValidObjectId } from "mongoose";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  if (projects.length === 0 || !projects) {
    throw new ApiError(400, "Projects not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Project fetched successfully"));
});

export const addProject = asyncHandler(async (req, res) => {
  const { title, description, githubUrl, previewUrl } = req.body;
  if (
    [title, description, githubUrl, previewUrl].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const localFilePath = req.file?.path;
  if (!localFilePath) {
    throw new ApiError(400, "local file path is required");
  }
  const imagePath = await uploadImage(localFilePath);
  if (!imagePath) {
    throw new ApiError(400, "Error while fetching the path from cloudinary");
  }

  const project = await Project.create({
    title,
    description,
    githubUrl,
    previewUrl,
    thumbnail: imagePath.secure_url,
    publicId: imagePath.public_id,
  });
  await project.save();
  if (!project) {
    throw new ApiError(400, "Error while adding the project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project added successfully"));
});

export const removeProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { publicId } = req.query;
  if (!isValidObjectId(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await Project.findByIdAndDelete(projectId);
  await deleteImage(publicId);
  if (!project) {
    throw new ApiError(400, "Issue while deleting the project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { publicId } = req.query;
  const { title, description, githubUrl, previewUrl } = req.body;
  
  const updatedFields = { title, description, githubUrl, previewUrl }

  if (req.file) {
    if (publicId) {
      await deleteImage(publicId);
    }

    const localFilePath = req.file?.path
    const imagePath = await uploadImage(localFilePath)
    if(!imagePath){
      throw new ApiError(400, "Error while fetching the path from cloudinary"); 
    }
    updatedFields.thumbnail = imagePath?.secure_url
    updatedFields.publicId = imagePath?.public_id
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      $set: updatedFields,
    },
    {
      new: true
    }
  );
  if(!updatedProject){
    throw new ApiError(404, "Error while updating the project")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});
