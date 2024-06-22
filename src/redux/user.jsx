import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    RegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LogoutUserSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    LoadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    sendRequest: (state, action) => {
      state.user = action.payload;
    },
    acceptRequestSuccess: (state, action) => {
      state.user = action.payload;
    },
    rejectRequestSuccess: (state, action) => {},

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  RegisterFailure,
  sendRequest,
  RegisterSuccess,
  LoadUserSuccess,
  LoadUserRequest,
  LoadUserFailure,
  LoginSuccess,
  LogoutUserSuccess,
  acceptRequestSuccess,
} = userReducer.actions;
export default userReducer.reducer;
