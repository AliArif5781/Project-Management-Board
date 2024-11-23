import { configureStore } from "@reduxjs/toolkit";
import DialogReducer from "../features/DialogBox/DialogSlice";
import TextReducer from "../features/TextValue/TextValueSlice";
import TaskReducer from "../features/ProjectTask/ProjectTaskSlice";
import AddReducer from "../features/AddTask/AddTaskSlice";
export const store = configureStore({
  reducer: {
    dialogBox: DialogReducer,
    text: TextReducer,
    task: TaskReducer,
    addNewTask: AddReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
