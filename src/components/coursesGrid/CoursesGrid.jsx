import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";

export const CoursesGrid = () => {
  const { coursesList } =
    useContext(GlobalContext);
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 py-10 lg:mx-0 lg:max-w-none xl:grid-cols-6">
      {coursesList.length > 0 ? coursesList.map((course) => {
        return (
          <Link
            to={`/course/${course._id}`}
            key={course._id}
            className="flex max-w-xl flex-col items-start justify-between p-2"
          >
            <div className="h-36">
              <img src={course.featureImage} className="w-screen h-36" alt="" />
            </div>
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={course.datetime} className="text-gray-500">
                {course.date}
              </time>
              <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {course.date}
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                {/* <a href={course.href}> */}
                <span className="absolute inset-0" />
                {course.title}
                {/* </a> */}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {course.description}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                Rs. {course.price}
              </h3>
            </div>
          </Link>
        );
      }): <>Courses Are Coming Soon</>}
    </div>
  );
};
