import { configureStore } from "@reduxjs/toolkit";
import secondaryPageReducer from "./redux/secondary";
import primaryPageReducer from "./redux/primary";
import userReducer from "./redux/user";
import chat from "./redux/chat";
export default configureStore({
  reducer: {
    user: userReducer,
    secondaryPage: secondaryPageReducer,
    primaryPage: primaryPageReducer,
    chat: chat,
  },
});
