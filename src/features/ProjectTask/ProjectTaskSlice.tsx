import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "draft" | "in-progress" | "done" | "";

interface TextState {
  value: string;
  inputValue: string;
  // priotity: TaskPriority;
}
const initialState: TextState = {
  value: "",
  inputValue: "",
  // priotity: "normal",
};

export const TaskSlice = createSlice({
  name: "text-value",
  initialState,
  reducers: {
    setTaskStatus: (state, action: PayloadAction<TaskStatus>) => {
      // select option draft, in progress and done
      state.value = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      // input value
      state.inputValue = action.payload;
    },

    // setPriorityValue: (state, action: PayloadAction<TaskPriority>) => {
    //   // input value
    //   state.priotity = action.payload;
    //   if (action.payload) {
    //     localStorage.setItem("TaskPriority", action.payload);
    //   }
    // },
  },
});

export const { setTaskStatus, setInputValue } = TaskSlice.actions;
export default TaskSlice.reducer;
