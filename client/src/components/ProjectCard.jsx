import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { RiSignalTowerFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function ProjectCard({project}) {
  return (
    <div className="p-4 -m-4">
      <div className="h-fit w-[300px] md:w-[320px] border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-clip lg:overflow-hidden hover:shadow-md lg:hover:scale-105 transition-all backdrop-blur-3xl shadow-xl">
        <a href="">
          <img
            className="lg:h-48 h-[200px] w-full object-cover object-center"
            src={project?.thumbnail}
            alt="project-thumb"
          />
        </a>
        <div className="p-4 flex flex-col lg:gap-3">
          <h2 className="tracking-widest text-2xl text-white">
            {project?.title}
          </h2>
          <h1 className="text-lg lg:text-md leading-5 text-gray-400">
            {project?.description}
          </h1>
          <div className="flex items-center justify-between ">
            <Link to={project?.githubUrl} target="_blank">
              <AiFillGithub className="text-pink-500 font-bold inline-flex items-center text-lg md:text-xl md:mb-2 lg:mb-0 hover:text-purple-600 cursor-pointer" />
            </Link>
            <Link to={project?.previewUrl} target="_blank">
              <RiSignalTowerFill className="text-pink-500 font-bold inline-flex items-center text-lg md:text-xl md:mb-2 lg:mb-0 hover:text-purple-600 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
