import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextState {
  Textvalue: string;
  TextDescription: string;
}

const initialState: TextState = {
  Textvalue: "",
  TextDescription: "",
};

export const TextSlice = createSlice({
  name: "text-value",
  initialState,
  reducers: {
    setTitleValue: (state, action: PayloadAction<string>) => {
      state.Textvalue = action.payload;
    },
    setTitleDescription: (state, action: PayloadAction<string>) => {
      state.TextDescription = action.payload;
    },
  },
});

export const { setTitleValue, setTitleDescription } = TextSlice.actions;
export default TextSlice.reducer;
