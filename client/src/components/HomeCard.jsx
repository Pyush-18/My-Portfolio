import React from "react";
import hero from "../assets/hero.png"

function HomeCard() {
  return (
    <div className="w-[80vw] flex flex-col lg:flex-row gap-5 lg:gap-0 justify-center items-center mb-20 lg:mb-36">
      <div data-aos="fade-up-right" className="flex flex-col gap-5 lg:w-[50%]">
        <h1 className="text-5xl pb-3 lg:text-7xl bg-gradient-to-r from-white  to-purple-600 to-30% bg-clip-text text-transparent">Hey!</h1>
        <p className="text-gray-300 text-xl lg:text-2xl">
          My name is Piyush, a passionate 20-year-old MERN stack developer with
          a deep enthusiasm for technology and innovation. I thrive on building
          dynamic web applications, solving complex problems, and continuously
          exploring the ever-evolving IT sector to stay ahead in the game.
        </p>
      </div>
      <div data-aos="fade-up-left">
        <img src={hero} alt="profile" className="rounded-full w-[200px] h-[200px] lg:w-[450px] lg:h-[450px] mx-auto" />
      </div>
    </div>
  );
}

export default HomeCard;
