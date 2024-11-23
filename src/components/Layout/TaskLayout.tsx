import { Outlet } from "react-router-dom";
import TaskNavbar from "../Common/TaskNavbar";

const TaskLayout = () => {
  return (
    <div>
      <TaskNavbar />
      <Outlet />
    </div>
  );
};

export default TaskLayout;
