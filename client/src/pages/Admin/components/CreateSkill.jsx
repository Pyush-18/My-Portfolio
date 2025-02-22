import {useState} from "react";
import axios from "axios"
import { SKILL_API_ENDPOINT } from "../../../Api/Api";
import toast from 'react-hot-toast'

function CreateSkill() {
  const [skill, setSkill] = useState("")
  const [level, setLevel] = useState(0)

  const skillHandler = async(e) => {
    e.preventDefault()
    if(skill?.trim() === "" || level === 0){
      toast.error("Skill & level can never be empty or 0")
      return
    }
    try {
      const response = await axios.post(`${SKILL_API_ENDPOINT}/add`, {skill, level}, {
        headers: {
          "Content-Type": "application/json"
        }
      },{withCredentials: true})
      if(response?.data?.message){
        console.log(response?.data?.user)
        toast.success(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
    setSkill("")
    setLevel(0)
  }
  return (
    <div className="p-4 backdrop-blur-3xl rounded-md w-full lg:w-fit mx-auto">
      <h1 className="text-3xl lg:text-5xl text-white my-5">Add Skill</h1>
      <form onSubmit={(e) => skillHandler(e)} className="flex flex-col gap-3">
        <input
          type="text"
          name="skill"
          id="skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Enter new skill"
          required
          className="bg-transparent px-3 py-2 border rounded-full text-white w-full font-medium lg:w-[40vw]"
        />
        <input
          type="number"
          name="level"
          id="level"
          value={level}
          min={1}
          max={5}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Not more than 5"
          required
          className="bg-transparent px-3 py-2 border rounded-full text-white w-full font-medium lg:w-[40vw]"
        />
        <button type="submit" className="bg-purple-500 px-3 py-2 rounded-full mx-auto w-[40vw] lg:w-[10vw] font-bold text-white hover:bg-purple-600 transition-all ease-in-out">Add Skill</button>
      </form>
    </div>
  );
}

export default CreateSkill;
