import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai";
import { toggle } from "../../../redux/slices/navSlice";
import { setPage } from "../../../redux/slices/pageSlice";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../Api/Api";
import toast from "react-hot-toast";
import { logout, setAuthUser } from "../../../redux/slices/authSlice";
function AdminNavbar() {
  const { toggleNav } = useSelector((store) => store.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {   
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      
      if (response?.data?.success) {
        dispatch(logout());
        dispatch(setAuthUser(null))
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <nav
      className={`bg-white bg-opacity-5 backdrop-blur-xl text-white w-screen z-10 rounded-xl lg:rounded-none fixed lg:static h-screen lg:h-fit flex flex-col lg:flex-row justify-evenly items-center lg:justify-between border border-none lg:border-gray-500 py-10 lg:py-3 lg:px-2 transition-all  ease-in-out ${
        toggleNav ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <div
        className="absolute top-5 right-5 text-lg hover:scale-125 cursor-pointer hover:text-red-400 transition-all lg:hidden"
        onClick={() => dispatch(toggle())}
      >
        <AiOutlineClose size={24} />
      </div>
      <ul className="text-2xl flex justify-center flex-col lg:flex-row gap-3 lg:gap-2">
        <li
          onClick={() => dispatch(setPage("createProject"))}
          to="/create-project"
          className="text-start cursor-pointer hover:bg-purple-500 hover:bg-opacity-60 hover:shadow-lg px-2 py-1 transition-all outline-none rounded-md"
        >
          Create Project
        </li>
        <li
          onClick={() => dispatch(setPage("createSkill"))}
          to="/create-skill"
          className="text-start cursor-pointer hover:bg-purple-500 hover:bg-opacity-60 hover:shadow-lg px-2 py-1 transition-all outline-none rounded-md"
        >
          Create Skills
        </li>
        <li
          onClick={() => dispatch(setPage("AllSkills"))}
          to="/all-skills"
          className="text-start cursor-pointer hover:bg-purple-500 hover:bg-opacity-60 hover:shadow-lg px-2 py-1 transition-all outline-none rounded-md"
        >
          All Skills
        </li>
        <li
          onClick={() => dispatch(setPage("AllProjects"))}
          to="/all-projects"
          className="text-start cursor-pointer hover:bg-purple-500 hover:bg-opacity-60 hover:shadow-lg px-2 py-1 transition-all outline-none rounded-md"
        >
          All Projects
        </li>
      </ul>

      <button
        onClick={logoutHandler}
        className="text-2xl px-2 py-1 text-center hover:bg-red-500 hover:bg-opacity-60 hover:shadow-lg transition-all outline-none rounded-md"
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
