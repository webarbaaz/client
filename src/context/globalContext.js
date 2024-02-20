import React, { createContext, useState } from "react";
import { getCourses } from "../api";
import { getUserFromLocal } from "../services/authenticationService";

// Create a context object
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Define state or any data you want to share globally

  const [globalUser, setGlobalUser] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [course, setCourse] = useState({});


  useState(() => {
    const storedUser = getUserFromLocal();
    if (storedUser) {
      setGlobalUser(JSON.parse(storedUser));
    }
  });

  const fetchCourses = async () => {
    const res = await getCourses();
    if (res) {
      if (res.status === 200) {
        setCoursesList(res.data.courses);
      }
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        globalUser,
        setGlobalUser,
        coursesList,
        setCoursesList,
        fetchCourses,
        course, setCourse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
