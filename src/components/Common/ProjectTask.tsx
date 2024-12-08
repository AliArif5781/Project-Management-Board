import React, { useState, useEffect } from "react"; // Import useState hook
import { useDispatch, useSelector } from "react-redux";
import {
  setInputValue,
  setTaskStatus,
} from "../../features/ProjectTask/ProjectTaskSlice";
import { RootState } from "../../app/store";
import { TaskStatus } from "../../features/ProjectTask/ProjectTaskSlice";
import { Plus, Trash2 } from "lucide-react";
import {
  addTask,
  deleteTask,
  setStatus,
  startTimer,
  stopTimer,
  TaskPriority,
  updateTimers,
} from "../../features/AddTask/AddTaskSlice";
import { FaPause, FaPlay } from "react-icons/fa";

const ProjectTask: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.task.value);
  const inputValue = useSelector((state: RootState) => state.task.inputValue);
  const tasks = useSelector((state: RootState) => state.addNewTask.tasks);

  // Local state to manage task priority
  const [priority, setPriority] = useState<TaskPriority>("normal");

  const savedProjectTitle = localStorage.getItem("projectTitle");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTaskStatus(e.target.value as TaskStatus));
  };
  const handleStatus = (
    taskId: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as TaskStatus;
    dispatch(setStatus({ taskId, status: newStatus }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as TaskPriority); // Update the priority value
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const taskStatus = status || "draft";
      dispatch(
        addTask({
          name: inputValue,
          status: taskStatus as TaskStatus,
          priority,
        })
      );
      dispatch(setInputValue("")); // Clear the input after adding the task
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  // Update running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTimers());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Format time in HH:MM:SS
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleTimerToggle = (taskId: string, isRunning: boolean) => {
    if (isRunning) {
      dispatch(stopTimer(taskId));
    } else {
      dispatch(startTimer(taskId));
    }
  };

  return (
    <div className="px-4 py-9 h-[100%] bg-gradient-to-r from-[#E9E9E9] to-[#F6F6F6] mx-4 rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Project Tasks</h1>
      <span className="text-black-100 text-sm font-light">
        Write your current task about your{" "}
        <strong className=" capitalize font-semibold">
          {savedProjectTitle}
        </strong>{" "}
        project.
      </span>
      {/* Task Input Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-12 lg:grid-cols-12 m-auto">
        {/* Input Field */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6">
          <input
            type="text"
            value={inputValue}
            placeholder="Enter your task"
            className="w-full text-base p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white-100 shadow-sm"
            onChange={handleValueChange}
          />
        </div>

        {/* Status Dropdown */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 md:px-1">
          <select
            className="py-[13px] px-5 text-sm text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="draft">Draft</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 md:px-1">
          <select
            className="py-[13px] px-5 text-sm text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
            value={priority} // Bind the dropdown value to the state
            onChange={handlePriorityChange} // Update priority state when the dropdown changes
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Add Task Button */}
        <div className="col-span-1 md:col-span-4 lg:col-span-2">
          <button
            className="flex items-center justify-center rounded-lg bg-black-200 text-white py-[10px] px-5 hover:bg-black-250 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
            onClick={handleAddTask}
          >
            <Plus className="mr-2" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6">
        {tasks.length > 0
          ? tasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 p-4 mb-3 px-5bg-[#F9FAFB] rounded-lg shadow-md border border-gray-200 items-center"
              >
                {/* Task Name */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                  <p className="text-base lg:text-lg text-black-200 font-medium capitalize max-w-lg break-words">
                    {task.name}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                  <span
                    className={`inline-block text-sm text-gray-500 font-semibold capitalize px-2 py-1 rounded
                ${
                  task.status === "draft"
                    ? "bg-[#E5E7EB] text-[#1F2937]"
                    : task.status === "in-progress"
                    ? "bg-[#a3c8f6] text-[#1E40B6]"
                    : task.status === "done"
                    ? "bg-[#BBF7D0] text-[#166551]"
                    : ""
                }
              `}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Priority */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-1">
                  <span className="inline-block text-sm text-gray-500 capitalize px-2 py-1 rounded">
                    {task.priority}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-2">
                  <select
                    className="w-full sm:w-[120px] py-2 text-sm text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={task.status}
                    onChange={(e) => handleStatus(task.id, e)}
                  >
                    <option value="draft">Draft</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Delete Button */}
                <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex justify-end">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition-all p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Timer Section */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-12 mt-2 flex justify-end items-center gap-2">
                  <button
                    className="p-2 rounded-lg text-white transition-colors"
                    onClick={() =>
                      handleTimerToggle(task.id, task.timerRunning)
                    }
                  >
                    {task.timerRunning ? (
                      <FaPause className="w-4 h-4 text-red-500" />
                    ) : (
                      <FaPlay className="w-4 h-4 text-black-100" />
                    )}
                  </button>
                  <span className="font-mono text-base text-white-200">
                    {formatTime(
                      task.elapsedTime +
                        (task.timerRunning && task.lastStartTime
                          ? Date.now() - task.lastStartTime
                          : 0)
                    )}
                  </span>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default ProjectTask;
