import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { setProjects, setRefresh } from "../../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_API_ENDPOINT } from "../../../Api/Api.js";
import { MdDelete, MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";

function AllProjects() {
  const { projects, refresh } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImg = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
  };

  const getProjectsHandler = async () => {
    try {
      const response = await axios.get(`${PROJECT_API_ENDPOINT}/get`);
      if (response?.data?.success) {
        dispatch(setProjects(response?.data?.user));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProjectsHandler();
  }, [refresh]);

  const deleteHandler = async (projectId, publicId) => {
    try {
      const response = await axios.delete(
        `${PROJECT_API_ENDPOINT}/remove/${projectId}?publicId=${publicId}`
      );
      if (response?.data?.success) {
        dispatch(setRefresh());
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateProject = async (projectId, publicId) => {
    setEdit(!edit);
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("githubUrl", githubUrl);
    formData.append("previewUrl", previewUrl);
    if (selectedImg) {
      formData.append("thumbnail", selectedImg);
    }
    try {
      const response = await axios.put(
        `${PROJECT_API_ENDPOINT}/update/${projectId}?publicId=${publicId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response?.data?.success){
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-white lg:h-[80vh] ">
      {projects.map((project) => (
        <div
          key={project?._id}
          className="flex flex-col border-2 w-[80vw] lg:w-[30vw] rounded-lg p-2 gap-3"
        >
          <div className="flex flex-col  justify-between gap-5">
            <img
              src={project.thumbnail}
              alt=""
              className={`w-fit h-[180px] lg:w-[200px] lg:h-auto ${
                edit && "hidden"
              }`}
            />
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImg}
              accept="image/*"
              className={`${edit ? "block" : "hidden"} `}
            />
            <div className="flex flex-col gap-1">
              <h1
                className={`text-xl lg:text-3xl ${
                  edit &&
                  selectedProject === project?._id &&
                  "bg-indigo-500 bg-opacity-30"
                }`}
              >
                {edit ? (
                  <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    value={
                      selectedProject === project?._id
                        ? newTitle
                        : project?.title
                    }
                    className="w-full bg-transparent px-3 "
                  />
                ) : (
                  project?.title
                )}
              </h1>
            </div>
            <div>
              <label htmlFor="desc">Description: </label>
              <h1
                className={`${
                  edit &&
                  selectedProject === project?._id &&
                  "bg-indigo-500 bg-opacity-30"
                } text-sm lg:text-base text-gray-300 `}
              >
                {edit ? (
                  <input
                    type="text"
                    name="desc"
                    id="desc"
                    value={
                      selectedProject === project?._id
                        ? newDescription
                        : project?.description
                    }
                    className="w-full bg-transparent"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                ) : (
                  project.description
                )}
              </h1>
            </div>
            <div>
              <label htmlFor="githubUrl">Github : </label>
              <h1
                className={`${
                  edit &&
                  selectedProject === project?._id &&
                  "bg-indigo-500 bg-opacity-30"
                } text-sm lg:text-base text-gray-300 `}
              >
                {edit ? (
                  <input
                    type="url"
                    name="githubUrl"
                    id="githubUrl"
                    value={
                      selectedProject === project?._id
                        ? githubUrl
                        : project?.githubUrl
                    }
                    className="w-full bg-transparent"
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                ) : (
                  project.githubUrl
                )}
              </h1>
            </div>
            <div>
              <label htmlFor="previewUrl">Preview : </label>
              <h1
                className={`${
                  edit &&
                  selectedProject === project?._id &&
                  "bg-indigo-500 bg-opacity-30"
                } text-sm lg:text-base text-gray-300 `}
              >
                {edit ? (
                  <input
                    type="url"
                    name="previewUrl"
                    id="previewUrl"
                    value={
                      selectedProject === project?._id
                        ? previewUrl
                        : project?.previewUrl
                    }
                    className="w-full bg-transparent"
                    onChange={(e) => setPreviewUrl(e.target.value)}
                  />
                ) : (
                  project.previewUrl
                )}
              </h1>
            </div>
          </div>
          <div className="flex lg:flex-row justify-between items-center rounded-lg gap-3 px-3 lg:py-2 bg-indigo-500 bg-opacity-30">
            <MdEdit
              className={`text-lg hover:scale-125 transition-all ease-in-out delay-100 cursor-pointer hover:text-red-500 ${
                edit && selectedProject === project?._id ? "hidden" : "block"
              }`}
              onClick={() => {
                setEdit((prev) => !prev);
                setSelectedProject(project?._id);
                setNewTitle(project?.title);
                setNewDescription(project?.description);
                setGithubUrl(project?.githubUrl);
                setPreviewUrl(project?.previewUrl);
              }}
            />
            <TiTick
              className={`text-lg hover:scale-125 transition-all ease-in-out delay-100 cursor-pointer hover:text-red-500 ${
                edit && selectedProject === project?._id ? "block" : "hidden"
              }`}
              onClick={() => updateProject(project?._id, project?.publicId)}
            />
            <MdDelete
              className={`text-lg hover:scale-125 transition-all ease-in-out delay-100 cursor-pointer hover:text-red-500`}
              onClick={() => deleteHandler(project?._id, project?.publicId)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProjects;
