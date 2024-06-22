import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Protected({ isAuth, children, isProfileSet }) {
  const naviagte = useNavigate();
  if (isAuth) {
    return isProfileSet ? children : <Navigate to={"/setprofile"} />;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default Protected;
