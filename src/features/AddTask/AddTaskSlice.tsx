// First, let's update the AddTaskSlice.tsx to include timer-related state:

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus } from "../ProjectTask/ProjectTaskSlice";

export type TaskPriority = "normal" | "medium" | "high";

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  // New timer-related fields
  timerRunning: boolean; // Tracks if timer is currently running
  elapsedTime: number; // Total time accumulated
  lastStartTime: number | null; // Timestamp when timer was last started
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("TaskList") || "[]").map(
    (task: any) => ({
      ...task,
      timerRunning: false,
      elapsedTime: 0,
      lastStartTime: null,
    })
  ),
};

const AddTaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        name: string;
        status: TaskStatus;
        priority: TaskPriority;
      }>
    ) => {
      const newTask: Task = {
        id: Date.now().toString(),
        name: action.payload.name,
        status: action.payload.status,
        priority: action.payload.priority,
        timerRunning: false,
        elapsedTime: 0,
        lastStartTime: null,
      };
      state.tasks.push(newTask);
      localStorage.setItem("TaskList", JSON.stringify(state.tasks));
    },

    startTimer: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.timerRunning = true;
        task.lastStartTime = Date.now();
      }
      localStorage.setItem("TaskList", JSON.stringify(state.tasks));
    },

    stopTimer: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.lastStartTime) {
        task.timerRunning = false;
        task.elapsedTime += Date.now() - task.lastStartTime;
        task.lastStartTime = null;
      }
      localStorage.setItem("TaskList", JSON.stringify(state.tasks));
    },

    updateTimers: (state) => {
      const now = Date.now();
      state.tasks.forEach((task) => {
        if (task.timerRunning && task.lastStartTime) {
          task.elapsedTime = task.elapsedTime + (now - task.lastStartTime);

          task.lastStartTime = now;
        }
      });
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("TaskList", JSON.stringify(state.tasks));
    },

    updateTaskPriority: (
      state,
      action: PayloadAction<{ id: string; priority: TaskPriority }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setStatus: (
      state,
      action: PayloadAction<{ taskId: string; status: TaskStatus }>
    ) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = status;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskPriority,
  startTimer,
  stopTimer,
  updateTimers,
  setStatus,
} = AddTaskSlice.actions;
export default AddTaskSlice.reducer;
