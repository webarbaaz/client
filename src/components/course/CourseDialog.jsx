import { Dialog } from "primereact/dialog";
import React from "react";
import { onInputChange, onNestedInputChange } from "../../utils/setter";

export const CourseDialog = ({
  visibleDialog,
  hideDialog,
  handleSubmit,
  course,
  setCourse,
  deleteLesson,
  addMoreLessons,
}) => {
  return (
    <div>
      {" "}
      <Dialog
        style={{ width: "95%" }}
        visible={visibleDialog}
        onHide={hideDialog}
      >
        <div className="p-grid lg:p-6 mt-3 p-fluid">
          <div className="col-12 mb-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="featureImage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Feature Image (Link)
                </label>
                <div className="mt-2">
                  <input
                    id="featureImage"
                    name="featureImage"
                    type="text"
                    value={course.featureImage}
                    onChange={(e) => onInputChange(e, setCourse)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Courses Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={course.title}
                    onChange={(e) => onInputChange(e, setCourse)}
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={course?.description}
                    onChange={(e) => onInputChange(e, setCourse)}
                    type="text"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    value={course.price}
                    onChange={(e) => onInputChange(e, setCourse)}
                    type="number"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Duration
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="duration"
                    name="duration"
                    value={course.duration}
                    onChange={(e) => onInputChange(e, setCourse)}
                    type="text"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="lessons-section">
                <h2 className="text-md font-semibold text-black mb-3">
                  Add lessons
                </h2>
                {course.lessons.map((lesson, index) => {
                  return (
                    <div className="pl-5" key={index}>
                      <div className="mb-5">
                        <label
                          htmlFor={"title" + lesson.id}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            id={"title" + lesson.id}
                            name={`lessons-${index}-title`}
                            type="text"
                            value={lesson.title}
                            onChange={(e) => onNestedInputChange(e, setCourse)}
                            required
                            className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={"description" + lesson.id}
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                        </div>
                        <div className="mt-2">
                          <textarea
                            id={"description" + lesson.id}
                            name={`lessons-${index}-description`}
                            value={lesson?.description}
                            onChange={(e) => onNestedInputChange(e, setCourse)}
                            type="text"
                            required
                            className="block px-3 mb-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor={"videoLink" + lesson.id}
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Video Link
                        </label>
                        <div className="mt-2">
                          <input
                            id={"videoLink" + lesson.id}
                            name={`lessons-${index}-videoLink`}
                            type="text"
                            value={lesson.videoLink}
                            onChange={(e) => onNestedInputChange(e, setCourse)}
                            required
                            className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      {course?.lessons?.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => deleteLesson(e, lesson.id)}
                          className="flex mb-3 justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
                <div className=" my-5 flex justify-end">
                  <button
                    type="button"
                    onClick={addMoreLessons}
                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add More Lessons
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
