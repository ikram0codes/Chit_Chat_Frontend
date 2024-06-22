import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { removeNotification } from "../../api";

const Notifications = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications(user.notifications);
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className="head">Notifications</h1>
        <div>
          <span className={styles.num}>{notifications.length}</span>
        </div>
      </div>
      <div className={styles.list}>
        {notifications.length === 0 ? (
          <div className="alt">
            <h1>No Notifications</h1>
          </div>
        ) : (
          notifications.map((msg) => {
            return (
              <div className={styles.message} key={msg._id}>
                <img src={msg.avatar} alt="Avatar" />
                <p>{msg.message}</p>
                <button
                  className={styles.close}
                  onClick={async () => {
                    let returnedUser = await removeNotification(msg._id);
                    setNotifications(returnedUser.notifications);
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
