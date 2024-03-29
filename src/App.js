import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes";
import { GlobalContext } from "./context/globalContext";
import { useContext, useEffect } from "react";
import { getToken } from "./services/authenticationService";
function App() {
  const { fetchCourses } = useContext(GlobalContext);
  useEffect(() => {
    if (getToken) {
      const fetchData = async () => {
        await fetchCourses();
      };
      fetchData();
    }
  }, [fetchCourses]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
