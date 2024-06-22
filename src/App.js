import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Main from "./Pages/Main/Main";
import Register from "./Pages/Register/Register";
import SetProfile from "./Pages/SetProfile/SetProfile";
import CreateGroup from "./Pages/CreateGroup/CreateGroup";
import Protected from "./Protected";
import { io } from "socket.io-client";
import {
  LoadUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
} from "./redux/user";
import { setOnlineUsers } from "./redux/chat";
import Menu from "./Components/Menu/Menu";
import Loader from "./Components/Loader/Loader";
import MobMenu from "./Components/MobMenu/MobMenu";
const App = () => {
  const socket = useRef();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const isProfileSet = user !== null ? user.isProfileSet : false;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("ws://groovy-marred-bandicoot.glitch.me", {
      withCredentials: true,
    });
    (async function autoLoginApiCall() {
      setLoading(true);
      try {
        dispatch(LoadUserRequest());
        const response = await axios.get(`http://localhost:4000/user/refresh`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(LoadUserSuccess(response.data.user));
        socket.current.emit("new-user-joined", response.data.user._id);
        socket.current.on("get-users", (onlineUsers) => {
          dispatch(setOnlineUsers(onlineUsers));
        });
        setLoading(false);
      } catch (error) {
        dispatch(LoadUserFailure(error.response.data.message));
      } finally {
        return setLoading(false);
      }
    })();

    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
      setSendMessage(null);
    }
  }, [sendMessage]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected isAuth={isAuth} isProfileSet={isProfileSet}>
                <div className="main-page">
                  <Main
                    receivedMessage={receivedMessage}
                    setSendMessage={setSendMessage}
                    socket={socket}
                  />
                  <div className="mob-menu">
                    <MobMenu user={user} />
                  </div>
                </div>
              </Protected>
            }
            exact
          />
          <Route path="/signup" element={<Register />} exact />
          <Route
            path="/login"
            element={
              isAuth === true ? (
                <Navigate to={"/"} />
              ) : (
                <Login socket={socket} />
              )
            }
            exact
          />
          <Route path="/setprofile" element={<SetProfile />} exact />
          <Route
            path="/creategroup"
            element={
              <Protected isAuth={isAuth} isProfileSet={isProfileSet}>
                <div className="group-page">
                  <Menu />
                  <CreateGroup />
                </div>
              </Protected>
            }
            exact
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
