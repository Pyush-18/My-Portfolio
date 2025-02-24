import React, { useState } from "react";
import axios from "axios"
import {PROJECT_API_ENDPOINT} from "../../../Api/Api.js"
import toast from "react-hot-toast"

function CreateProject() {
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [thumbnail, setThumbnail] = useState("")
   const [githubUrl, setGithubUrl] = useState("")
   const [previewUrl, setPreviewUrl] = useState("")

   const handleImage = (e) => {
    const file = e.target.files[0]
    setThumbnail(file)
   }

   const addProject = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("thumbnail", thumbnail)
    formData.append("githubUrl", githubUrl)
    formData.append("previewUrl", previewUrl)
    try {
    
      const response = await axios.post(`${PROJECT_API_ENDPOINT}/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true, 
    });
    console.log(response)
      if(response?.data?.success){
        toast.success(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
   }
  return (
    <div className="p-4 backdrop-blur-3xl rounded-md w-fit mx-auto">
      <h1 className="text-3xl lg:text-5xl text-white  mb-5">Create Project</h1>
      <form onSubmit={(e) => addProject(e)} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Name"
          required
          className="bg-transparent px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text"
        />
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color="30"
          rows="8"
          placeholder="Project description"
          required
          className="bg-transparent px-3 py-2 border rounded-md w-full lg:w-[40vw] font-bold text-xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text"
        />
        <div>
          <label htmlFor="img" className="bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text text-xl">Project Image : </label>
          <input type="file" name="img" id="img" accept="image/*" required onChange={handleImage}/>
        </div>
        <input
          type="url"
          name="githubUrl"
          id="githubUrl"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="Github Url"
          className="bg-transparent px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text"
        />
        <input
          type="url"
          name="previewUrl"
          id="previewUrl"
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
          placeholder="Preview Url"
          className="bg-transparent px-3 py-2 border rounded-full w-full lg:w-[40vw] font-bold text-xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text"
        />
        <button type="submit" className="bg-purple-500 px-3 py-2 border rounded-full mx-auto w-[40vw] lg:w-[10vw] font-bold text-white">Add Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
