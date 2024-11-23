import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/Common/HeroSection";
import ProjectTask from "../components/Common/ProjectTask";
import TaskLayout from "../components/Layout/TaskLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
    ],
  },
  {
    path: "projectTask",
    element: <TaskLayout />,
    children: [
      {
        path: "",
        element: <ProjectTask />,
      },
    ],
  },
]);
export default router;
