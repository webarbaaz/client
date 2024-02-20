import React from "react";
import { HeroSection } from "../../components/heroSection/HeroSection";
import { CoursesGrid } from "../../components/coursesGrid/CoursesGrid";

export const Home = () => {
  return (
    <div className="max-w-[1900px] mx-auto md:px-10">
      <HeroSection />
      <h3 className="mt-3 text-2xl lg:px-2 px-5 font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        Top Courses
      </h3>
      <CoursesGrid />
    </div>
  );
};
