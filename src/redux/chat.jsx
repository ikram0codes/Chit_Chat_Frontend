import { createSlice } from "@reduxjs/toolkit";

export const chat = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = chat.actions;

export default chat.reducer;
