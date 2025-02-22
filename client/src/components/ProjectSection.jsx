import React from "react";
import ProjectCard from "./ProjectCard";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { useRef } from "react";
import { useSelector } from "react-redux";

function ProjectSection() {
  const scrollRef = useRef(null);
  const { projects } = useSelector((store) => store.user);
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 500;
  };
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 500;
  };
  return (
    <div data-aos="fade-down" className="mb-20 lg:mb-36">
      <h1 className="text-5xl p-2 lg:text-7xl bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text mb-10">
        My Projects
      </h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll gap-8 lg:p-3 scroll-hide"
      >
        {projects?.length > 0 && projects?.map((project) => <ProjectCard project={project}/>)}
      </div>
      <div className="flex justify-center items-center gap-3 mt-2 select-none">
        <HiArrowLeft
          onClick={scrollLeft}
          className="text-xl lg:text-2xl text-yellow-500 hidden lg:block cursor-pointer"
        />
        <h2 className="font-mono text-lg uppercase text-white">
          Slide for more
        </h2>
        <HiArrowRight
          onClick={scrollRight}
          className="text-xl lg:text-2xl text-yellow-500 hidden lg:block cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ProjectSection;
