import React from "react";
import styles from "./Primary.module.css";
import logo from "../../assets/logo.png";
import ballon from "../../assets/chat-ballon.png";
import { useDispatch } from "react-redux";
import { userProfilePage } from "../../redux/primary";
const Primary = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} alt="logo" />
          <h1>Chit Chat</h1>
        </div>
        <div className={styles.message}>
          <p>Select a Chat to start chatting with your beloved Ones</p>
          <img src={ballon} alt="chat-ballon" />
        </div>
        <button
          onClick={() => {
            dispatch(userProfilePage());
          }}
        >
          Visit Your Profile
        </button>
      </div>
    </div>
  );
};

export default Primary;
