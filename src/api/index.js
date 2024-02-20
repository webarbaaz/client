import { customAxios } from "../axiosInterceptor";

export const register = async (payload) => {
  try {
    const res = await customAxios.post("/auth/register", payload);
    return res;
  } catch (error) {
    return error;
  }
};
export const login = async (payload) => {
  try {
    const res = await customAxios.post("/auth/login", payload);
    return res;
  } catch (error) {
    return error;
  }
};

export const getCourses = async () => {
  try {
    const res = await customAxios.get("/courses");
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchCoursesById = async (courseId) => {
  try {
    const res = await customAxios.get(`/courses/${courseId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchCourseById = async (courseId) => {
  try {
    const res = await customAxios.get(`/courses/course/${courseId}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const postCourse = async (payload) => {
  try {
    const res = await customAxios.post("/courses", payload);
    return res;
  } catch (error) {
    return error;
  }
};
export const patchCourse = async (data) => {
  try {
    const { _id, ...payload } = data;
    const res = await customAxios.patch(`/courses/${_id}`, payload);
    return res;
  } catch (error) {
    return error;
  }
};
export const deleteCourseById = async (id) => {
  try {
    const res = await customAxios.delete(`/courses/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
