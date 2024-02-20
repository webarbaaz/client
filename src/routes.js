import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Home } from "./pages/Home/Home";
import { CoursesPage } from "./pages/Courses/CoursesPage";
import Login from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { Profile } from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CourseDetailsPage from "./pages/Courses/CourseDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/courses", element: <CoursesPage />, },
      { path: "course/:id", element:<ProtectedRoute> <CourseDetailsPage /></ProtectedRoute> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
    ],
    errorElement: <NotFoundPage />,
  },
]);
