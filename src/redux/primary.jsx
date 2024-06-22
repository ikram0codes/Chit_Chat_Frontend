import { createSlice } from "@reduxjs/toolkit";

export const primaryPageSlice = createSlice({
  name: "primaryPage",
  initialState: {
    page: "welcome",
    id: null,
    chatId: null,
  },
  reducers: {
    welcome: (state) => {
      state.page = "welcome";
    },
    profilePage: (state, action) => {
      state.page = "profile";
      state.id = action.payload;
    },
    userProfilePage: (state) => {
      state.page = "userprofile";
      state.id = null;
    },
    chatPage: (state, action) => {
      state.page = "chat";
      state.id = action.payload[0];
      state.chatId = action.payload[1];
    },
    groupChatPage: (state, action) => {
      state.page = "chat";
      state.id = action.payload;
      state.chatId = null;
    },
    groupPage: (state, action) => {
      state.page = "groupProfile";
      state.id = action.payload;
    },
    settingsPage: (state) => {
      state.page = "settings";
    },
  },
});

export const {
  profilePage,
  userProfilePage,
  chatPage,
  groupPage,
  groupChatPage,
  welcome,
  settingsPage,
} = primaryPageSlice.actions;

export default primaryPageSlice.reducer;
