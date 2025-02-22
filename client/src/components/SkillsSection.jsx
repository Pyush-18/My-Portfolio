import React from "react";
import SkillCard from "./SkillCard";
import { useSelector } from "react-redux";

function SkillsSection() {
  const {skills} = useSelector(store => store.user)
  return (
    <div data-aos="fade-right" className="mb-20 lg:mb-36 ">
      <h1 className="text-5xl lg:text-7xl  mb-10 bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text">
        My Skills
      </h1>
      <div className="h-[300px] overflow-y-scroll select-none scroll-bar">
        {
            skills?.map((skill) => (
              <SkillCard key={skill?._id} skill={skill}/>
            ))
        }
      </div>
    </div>
  );
}

export default SkillsSection;
