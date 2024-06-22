import { createSlice } from "@reduxjs/toolkit";

export const secondaryPageSlice = createSlice({
  name: "secondaryPage",
  initialState: {
    page: "chats",
  },
  reducers: {
    setSecondaryPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setSecondaryPage } = secondaryPageSlice.actions;

export default secondaryPageSlice.reducer;
