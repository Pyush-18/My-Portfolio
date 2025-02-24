import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { SKILL_API_ENDPOINT } from "../../../Api/Api.js";
import { setRefresh, setSkills } from "../../../redux/slices/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {MdDelete} from "react-icons/md"

function AllSkills() {
  const { skills, refresh } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const getSkillHandler = async () => {
    try {
      const response = await axios.get(`${SKILL_API_ENDPOINT}/get`);
      if (response?.data?.success) {
        dispatch(setSkills(response?.data?.user));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getSkillHandler();
  }, [refresh]);

  const deleteHandler = async(skillId) => {
    try {
      const response = await axios.delete(`${SKILL_API_ENDPOINT}/remove/${skillId}`)
      if (response?.data?.success) {
        dispatch(setRefresh())
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] gap-3">
      {skills.map((skill) => (
        <div key={skill?._id} className="flex justify-between items-center text-white px-3 py-2 border w-[80vw] lg:w-[30vw] rounded-lg">
          <span>{skill.skill}</span>
          <progress
            max={100}
            value={skill.level * 20}
            className="progress-bar"
          />
          <MdDelete onClick={() => deleteHandler(skill?._id)} className="hover:scale-125 transition-all ease-in-out delay-100 cursor-pointer hover:text-red-500"/>
        </div>
      ))}
    </div>
  );
}

export default AllSkills;
