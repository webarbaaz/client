import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";
import { subString } from "../../utils/subString";

export const CoursesGrid = () => {
  const { coursesList } = useContext(GlobalContext);
  return (
    <div className="mx-auto px-5 md:px-0 grid max-w-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 py-10 lg:mx-0 lg:max-w-none xl:grid-cols-4">
      {coursesList.length > 0 ? (
        coursesList?.map((course) => {
          return (
            <div
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
              key={course._id}
            >
              <p>
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={course.featureImage}
                  alt="banner"
                />
              </p>
              <div className="p-5">
                <p>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course?.title}
                  </h5>
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {course.description && subString(course.description)}
                </p>
                <Link
                  to={`/course/${course._id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <>Coming Soon</>
      )}
    </div>
  );
};
