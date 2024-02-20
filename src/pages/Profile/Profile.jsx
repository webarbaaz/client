import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";

import { TabView, TabPanel } from "primereact/tabview";
import { toast } from "react-toastify";
import {
  postCourse,
  deleteCourseById,
  patchCourse,
  fetchCoursesById,
} from "../../api";
import { GlobalContext } from "../../context/globalContext";
import { CourseDialog } from "../../components/course/CourseDialog";

export const Profile = () => {
  let emptyCourse = {
    title: "",
    description: "",
    price: 0,
    duration: "",
    featureImage: "",
    lessons: [
      {
        id: 1,
        title: "",
        description: "",
        videoLink: "",
      },
    ],
  };

  const { globalUser, coursesList, setCoursesList } = useContext(GlobalContext);

  const [course, setCourse] = useState(emptyCourse);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [coursesListById, setCoursesListById] = useState([]);
  // const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetProfileCourses = async () => {
      const res = await fetchCoursesById(globalUser.id);
      if (res) {
        if (res.status === 200) {
          setCoursesListById(res.data.courses);
        }
      }
    };
    if (globalUser) {
      fetProfileCourses();
    }
  }, [globalUser]);

  const hideDialog = () => {
    setVisibleDialog(false);
    setCourse(emptyCourse);
  };

  const addMoreLessons = () => {
    setCourse((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: prev.lessons.length + 1,
          title: "",
          description: "",
          videoLink: "",
        },
      ],
    }));
  };

  const deleteLesson = (id) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      lessons: prevCourse.lessons.filter((lesson) => lesson.id !== id),
    }));
  };

  const deleteCourse = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await deleteCourseById(id);
    if (res) {
      if (res.status === 200) {
        toast.success(res.data.message);
        setCoursesListById((ps) => ps.filter((item) => id !== item._id));
        setCoursesList((ps) => ps.filter((item) => id !== item._id));
      }
    }
  };

  const editCourse = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const editableCourse = coursesListById.filter((item) => id === item._id)[0];
    const index = coursesList.findIndex((course) => course._id === id);
    if (index !== -1) {
      const updatedList = [...coursesList];
      updatedList[index] = editableCourse;
      setCoursesList(updatedList);
    }
    setCourse(editableCourse);
    setVisibleDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (course._id) {
      res = await patchCourse(course);
    } else {
      res = await postCourse(course);
    }
    if (res) {
      if (res.status === 201) {
        toast.success(res.data.message);
        setCoursesListById((prevCourses) => [...prevCourses, res.data.course]);
        setCoursesList((prevCourses) => [...prevCourses, res.data.course]);
      } else if (res.status === 200) {
        toast.success(res.data.message);
        setCoursesListById((prevCourses) => {
          const updatedCourses = prevCourses.map((item) =>
            item._id === course._id ? course : item
          );
          return updatedCourses;
        });
        setCoursesList((prevCourses) => {
          const updatedCourses = prevCourses.map((item) =>
            item._id === course._id ? course : item
          );
          return updatedCourses;
        });
      }
    }
    setCourse(emptyCourse);
    setVisibleDialog(false);
  };

  return (
    <div className="max-w-[1920px] mx-auto md:px-10">
      <div className="card">
        <TabView>
          <TabPanel header="My Courses">
            <div className="courses-container">
              {globalUser?.role === "teacher" && (
                <Toolbar
                  className="bg-transparent"
                  end={() => {
                    return (
                      <button
                        onClick={() => setVisibleDialog(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add Course
                      </button>
                    );
                  }}
                />
              )}

              {/* courses list  */}
              <div className="mx-auto grid max-w-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none xl:grid-cols-4">
                {coursesListById.length > 0 ? (
                  coursesListById?.map((item) => {
                    return (
                      <Link
                        to={`/course/${item._id}`}
                        key={item._id}
                        className="max-w-sm rounded-lg overflow-hidden shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          className="w-full h-48 object-cover"
                          src={item.featureImage}
                          alt="Sunset in the mountains"
                        />
                        <div className="px-6 py-4">
                          <div className="font-bold text-xl mb-2">
                            {item.title}
                          </div>
                          <p className="text-gray-700 text-base">
                            {item?.description?.length > 50
                              ? item?.description?.slice(0, 100) + "..."
                              : item.description}
                          </p>
                        </div>
                        {globalUser?.role === "teacher" && (
                          <div className="px-6 flex justify-between py-4">
                            <button
                              onClick={(e) => deleteCourse(e, item._id)}
                              className="bg-transparent hover:bg-rose-500 text-rose-700 font-semibold hover:text-white py-2 px-4 border border-rose-500 hover:border-transparent rounded"
                            >
                              Delete
                            </button>
                            <button
                              onClick={(e) => {
                                editCourse(e, item._id);
                              }}
                              tabIndex="0"
                              className="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  <>No Courses</>
                )}
              </div>
              {/* courses list  */}
              <CourseDialog
                visibleDialog={visibleDialog}
                hideDialog={hideDialog}
                handleSubmit={handleSubmit}
                course={course}
                setCourse={setCourse}
                deleteLesson={deleteLesson}
                addMoreLessons={addMoreLessons}
              />
            </div>
          </TabPanel>
          <TabPanel header="My Profile">
            <div>profile</div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};
