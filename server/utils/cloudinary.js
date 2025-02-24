import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



export const uploadImage = async(localFilePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export const deleteImage = async(prePublicId) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
    try {
        if(!prePublicId) return null
        const response = await cloudinary.uploader.destroy(prePublicId, {resource_type: "image"})
        return(response)
    } catch (error) {
        return error?.message || null
    }
}